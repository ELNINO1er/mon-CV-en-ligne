<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

const MAX_FIELD_LENGTH = 255;
const MAX_MESSAGE_LENGTH = 5000;

/**
 * Return a JSON response and stop execution.
 */
function respond(int $statusCode, array $payload): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Read a POST value with a CLI-friendly fallback to $_POST.
 */
function postValue(string $key): mixed
{
    $value = filter_input(INPUT_POST, $key, FILTER_UNSAFE_RAW);
    if ($value !== null) {
        return $value;
    }

    return $_POST[$key] ?? null;
}

/**
 * Trim and sanitize string input.
 */
function inputString(string $key, int $maxLength = MAX_FIELD_LENGTH): string
{
    $value = postValue($key);
    if (!is_string($value)) {
        return '';
    }

    $value = trim($value);
    if ($value === '') {
        return '';
    }

    $value = preg_replace('/\s+/u', ' ', $value) ?? $value;
    return mb_substr($value, 0, $maxLength);
}

/**
 * Build a database connection from the configured driver.
 */
function createDatabaseConnection(array $databaseConfig): PDO
{
    $driver = $databaseConfig['driver'] ?? 'sqlite';

    if ($driver === 'mysql') {
        $mysql = $databaseConfig['mysql'] ?? [];
        $host = $mysql['host'] ?? '127.0.0.1';
        $port = (int) ($mysql['port'] ?? 3306);
        $dbName = $mysql['database'] ?? '';
        $username = $mysql['username'] ?? '';
        $password = $mysql['password'] ?? '';
        $charset = $mysql['charset'] ?? 'utf8mb4';

        if ($dbName === '') {
            throw new RuntimeException('La configuration MySQL est incomplete.');
        }

        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $dbName, $charset);

        return new PDO(
            $dsn,
            $username,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }

    $sqlitePath = $databaseConfig['sqlite_path'] ?? (__DIR__ . '/storage/contact-messages.sqlite');
    $sqliteDirectory = dirname($sqlitePath);
    if (!is_dir($sqliteDirectory) && !mkdir($sqliteDirectory, 0775, true) && !is_dir($sqliteDirectory)) {
        throw new RuntimeException('Impossible de creer le dossier de stockage.');
    }

    return new PDO(
        'sqlite:' . $sqlitePath,
        null,
        null,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
}

/**
 * Create the contact_messages table if needed.
 */
function ensureMessagesTable(PDO $pdo, string $driver): void
{
    if ($driver === 'mysql') {
        $sql = <<<SQL
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) DEFAULT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    source_page VARCHAR(255) DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    mail_status VARCHAR(32) NOT NULL DEFAULT 'pending',
    mail_error TEXT DEFAULT NULL,
    sent_at DATETIME DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
SQL;
    } else {
        $sql = <<<SQL
CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    source_page TEXT DEFAULT NULL,
    ip_address TEXT DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    mail_status TEXT NOT NULL DEFAULT 'pending',
    mail_error TEXT DEFAULT NULL,
    sent_at TEXT DEFAULT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
SQL;
    }

    $pdo->exec($sql);
}

/**
 * Persist the message and return its id.
 */
function storeMessage(PDO $pdo, array $payload): int
{
    $statement = $pdo->prepare(
        'INSERT INTO contact_messages (name, email, phone, subject, message, source_page, ip_address, user_agent, mail_status)
         VALUES (:name, :email, :phone, :subject, :message, :source_page, :ip_address, :user_agent, :mail_status)'
    );

    $statement->execute(
        [
            ':name' => $payload['name'],
            ':email' => $payload['email'],
            ':phone' => $payload['phone'] !== '' ? $payload['phone'] : null,
            ':subject' => $payload['subject'],
            ':message' => $payload['message'],
            ':source_page' => $payload['source_page'] !== '' ? $payload['source_page'] : null,
            ':ip_address' => $payload['ip_address'],
            ':user_agent' => $payload['user_agent'],
            ':mail_status' => 'pending',
        ]
    );

    return (int) $pdo->lastInsertId();
}

/**
 * Update mail delivery status after attempting notification.
 */
function updateMailStatus(PDO $pdo, int $messageId, string $status, ?string $error = null): void
{
    $statement = $pdo->prepare(
        'UPDATE contact_messages
         SET mail_status = :mail_status, mail_error = :mail_error, sent_at = :sent_at
         WHERE id = :id'
    );

    $statement->execute(
        [
            ':mail_status' => $status,
            ':mail_error' => $error,
            ':sent_at' => $status === 'sent' ? gmdate('Y-m-d H:i:s') : null,
            ':id' => $messageId,
        ]
    );
}

/**
 * Configure PHPMailer transport.
 */
function configureMailer(PHPMailer $mailer, array $mailConfig): void
{
    $transport = $mailConfig['transport'] ?? 'smtp';

    if ($transport !== 'smtp') {
        throw new RuntimeException('Le transport e-mail configure n\'est pas pris en charge.');
    }

    $smtp = $mailConfig['smtp'] ?? [];
    $host = trim((string) ($smtp['host'] ?? ''));
    $username = trim((string) ($smtp['username'] ?? ''));
    $password = (string) ($smtp['password'] ?? '');
    $fromEmail = trim((string) ($smtp['from_email'] ?? ''));
    $fromName = trim((string) ($smtp['from_name'] ?? 'Portfolio'));

    if ($host === '' || $username === '' || $password === '' || $fromEmail === '') {
        throw new RuntimeException('Renseignez les identifiants SMTP dans config/contact.php.');
    }

    $mailer->CharSet = 'UTF-8';
    $mailer->setLanguage('fr', __DIR__ . '/phpmailer/language/');
    $mailer->isSMTP();
    $mailer->SMTPDebug = SMTP::DEBUG_OFF;
    $mailer->Host = $host;
    $mailer->SMTPAuth = true;
    $mailer->Username = $username;
    $mailer->Password = $password;
    $mailer->Port = (int) ($smtp['port'] ?? 465);

    $encryption = strtolower((string) ($smtp['encryption'] ?? 'ssl'));
    if ($encryption === 'tls') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } elseif ($encryption === 'ssl') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mailer->SMTPSecure = false;
        $mailer->SMTPAutoTLS = false;
    }

    $mailer->setFrom($fromEmail, $fromName);
}

/**
 * Send the e-mail notification to the portfolio owner.
 */
function sendNotification(array $config, array $payload, int $messageId): void
{
    $recipient = $config['recipient'] ?? [];
    $recipientEmail = trim((string) ($recipient['email'] ?? ''));
    $recipientName = trim((string) ($recipient['name'] ?? ''));

    if ($recipientEmail === '') {
        throw new RuntimeException('Aucune adresse destinataire n\'est configuree.');
    }

    $mail = new PHPMailer(true);
    configureMailer($mail, $config['mail'] ?? []);

    $mail->addAddress($recipientEmail, $recipientName);
    $mail->addReplyTo($payload['email'], $payload['name']);
    $mail->isHTML(true);

    $subjectLine = 'Nouveau message portfolio';
    if ($payload['subject'] !== '') {
        $subjectLine .= ' : ' . $payload['subject'];
    }

    $mail->Subject = $subjectLine;

    $body = [];
    $body[] = '<h2>Nouveau message recu depuis le portfolio</h2>';
    $body[] = '<p><strong>ID message :</strong> #' . $messageId . '</p>';
    $body[] = '<p><strong>Nom :</strong> ' . htmlspecialchars($payload['name'], ENT_QUOTES, 'UTF-8') . '</p>';
    $body[] = '<p><strong>Email :</strong> ' . htmlspecialchars($payload['email'], ENT_QUOTES, 'UTF-8') . '</p>';
    $body[] = '<p><strong>Telephone :</strong> ' . htmlspecialchars($payload['phone'] !== '' ? $payload['phone'] : '-', ENT_QUOTES, 'UTF-8') . '</p>';
    $body[] = '<p><strong>Sujet :</strong> ' . htmlspecialchars($payload['subject'], ENT_QUOTES, 'UTF-8') . '</p>';
    $body[] = '<p><strong>Message :</strong><br>' . nl2br(htmlspecialchars($payload['message'], ENT_QUOTES, 'UTF-8')) . '</p>';

    $mail->Body = implode("\n", $body);
    $mail->AltBody = implode(
        "\n",
        [
            'Nouveau message recu depuis le portfolio',
            'ID message : #' . $messageId,
            'Nom : ' . $payload['name'],
            'Email : ' . $payload['email'],
            'Telephone : ' . ($payload['phone'] !== '' ? $payload['phone'] : '-'),
            'Sujet : ' . $payload['subject'],
            'Message :',
            $payload['message'],
        ]
    );

    $mail->send();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Methode non autorisee.']);
}

$configPath = __DIR__ . '/config/contact.php';
if (!is_file($configPath)) {
    respond(500, ['success' => false, 'message' => 'Fichier de configuration introuvable.']);
}

$config = require $configPath;
if (!is_array($config)) {
    respond(500, ['success' => false, 'message' => 'Configuration invalide.']);
}

$payload = [
    'name' => inputString('name'),
    'email' => trim(filter_var((string) postValue('email'), FILTER_SANITIZE_EMAIL)),
    'phone' => inputString('phone'),
    'subject' => inputString('subject'),
    'message' => trim((string) postValue('message')),
    'website' => inputString('website'),
    'source_page' => inputString('source_page'),
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
    'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? mb_substr((string) $_SERVER['HTTP_USER_AGENT'], 0, 1000) : null,
];

$payload['message'] = mb_substr($payload['message'], 0, MAX_MESSAGE_LENGTH);

$errors = [];

if ($payload['website'] !== '') {
    respond(400, ['success' => false, 'message' => 'Requete invalide.']);
}

if ($payload['name'] === '' || mb_strlen($payload['name']) < 2) {
    $errors[] = 'Le nom est requis.';
}

if ($payload['email'] === '' || !filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Une adresse e-mail valide est requise.';
}

if ($payload['subject'] === '' || mb_strlen($payload['subject']) < 3) {
    $errors[] = 'Le sujet est requis.';
}

if ($payload['message'] === '' || mb_strlen($payload['message']) < 10) {
    $errors[] = 'Le message doit contenir au moins 10 caracteres.';
}

if ($errors !== []) {
    respond(422, ['success' => false, 'message' => implode(' ', $errors)]);
}

try {
    $databaseConfig = $config['database'] ?? [];
    $driver = $databaseConfig['driver'] ?? 'sqlite';
    $pdo = createDatabaseConnection($databaseConfig);
    ensureMessagesTable($pdo, $driver);
    $messageId = storeMessage($pdo, $payload);
} catch (Throwable $exception) {
    respond(500, ['success' => false, 'message' => 'Impossible d\'enregistrer votre message pour le moment.']);
}

$mailRequired = (bool) ($config['mail']['require_success'] ?? false);

try {
    sendNotification($config, $payload, $messageId);
    updateMailStatus($pdo, $messageId, 'sent');

    respond(
        200,
        [
            'success' => true,
            'message' => 'Message envoye avec succes. Je vous repondrai rapidement.',
        ]
    );
} catch (Throwable $exception) {
    updateMailStatus($pdo, $messageId, 'failed', mb_substr($exception->getMessage(), 0, 2000));

    if ($mailRequired) {
        respond(
            500,
            [
                'success' => false,
                'message' => 'Votre message a ete enregistre, mais la notification e-mail a echoue.',
            ]
        );
    }

    respond(
        200,
        [
            'success' => true,
            'message' => 'Votre message a ete enregistre. La notification e-mail sera active apres configuration SMTP.',
        ]
    );
}
