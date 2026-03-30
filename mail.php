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
 * Shared PDO options.
 */
function pdoOptions(): array
{
    return [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
}

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
    $driver = $databaseConfig['driver'] ?? 'mysql';

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

        $serverDsn = sprintf('mysql:host=%s;port=%d;charset=%s', $host, $port, $charset);
        $serverPdo = new PDO($serverDsn, $username, $password, pdoOptions());
        $serverPdo->exec(
            sprintf(
                'CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET %s COLLATE %s_unicode_ci',
                str_replace('`', '``', $dbName),
                $charset,
                $charset
            )
        );

        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $dbName, $charset);

        return new PDO($dsn, $username, $password, pdoOptions());
    }

    $sqlitePath = $databaseConfig['sqlite_path'] ?? (__DIR__ . '/storage/contact-messages.sqlite');
    $sqliteDirectory = dirname($sqlitePath);
    if (!is_dir($sqliteDirectory) && !mkdir($sqliteDirectory, 0775, true) && !is_dir($sqliteDirectory)) {
        throw new RuntimeException('Impossible de creer le dossier de stockage.');
    }

    return new PDO('sqlite:' . $sqlitePath, null, null, pdoOptions());
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
 * Escape text for safe HTML output.
 */
function escapeHtml(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/**
 * Format plain text paragraphs for HTML emails.
 */
function formatHtmlParagraphs(string $text): string
{
    return nl2br(escapeHtml($text));
}

/**
 * Build an email-safe brand block inspired by the site logo.
 */
function buildEmailBrandBlock(): string
{
    return <<<HTML
<table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;">
    <tr>
        <td style="padding:12px 14px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;background:linear-gradient(135deg,#10110c 0%,#171a12 100%);">
            <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                    <td style="padding:0 12px 0 0;vertical-align:middle;">
                        <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1;font-weight:700;color:#f2d40a;letter-spacing:-0.08em;text-shadow:1px 0 #2f68ff,-1px 0 #2f68ff,0 1px #2f68ff,0 -1px #2f68ff;">
                            &lt;/&gt;
                        </div>
                    </td>
                    <td style="vertical-align:middle;">
                        <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1;font-weight:800;letter-spacing:-0.06em;color:#ffffff;">RORO</div>
                        <div style="margin-top:3px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.2;font-weight:700;letter-spacing:0.04em;color:#f2d40a;">systems</div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
HTML;
}

/**
 * Build a polished HTML wrapper for outgoing emails.
 */
function buildEmailLayout(string $preheader, string $title, string $intro, string $content, string $footerNote): string
{
    $safePreheader = escapeHtml($preheader);
    $safeTitle = escapeHtml($title);
    $safeIntro = escapeHtml($intro);
    $safeFooterNote = escapeHtml($footerNote);
    $brandBlock = buildEmailBrandBlock();

    return <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">{$safePreheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f1ea;padding:32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:24px;overflow:hidden;">
                    <tr>
                        <td style="padding:32px 36px;background:#111111;color:#ffffff;">
                            <div style="margin-bottom:18px;">{$brandBlock}</div>
                            <div style="font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#f8d49a;margin-bottom:14px;">Portfolio Romaric BOMBADE</div>
                            <h1 style="margin:0;font-size:32px;line-height:1.2;font-weight:700;color:#ffffff;">{$safeTitle}</h1>
                            <p style="margin:14px 0 0;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.82);">{$safeIntro}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px 36px 20px;">
                            {$content}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 36px 32px;">
                            <div style="padding-top:18px;border-top:1px solid #e5e7eb;font-size:14px;line-height:1.7;color:#6b7280;">
                                {$safeFooterNote}
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
}

/**
 * Build the internal notification email content.
 */
function buildOwnerEmailContent(array $payload, int $messageId): array
{
    $subject = 'Nouveau message portfolio';
    if ($payload['subject'] !== '') {
        $subject .= ' : ' . $payload['subject'];
    }

    $detailsRows = [
        ['label' => 'ID message', 'value' => '#' . $messageId],
        ['label' => 'Nom', 'value' => $payload['name']],
        ['label' => 'Email', 'value' => $payload['email']],
        ['label' => 'Telephone', 'value' => $payload['phone'] !== '' ? $payload['phone'] : 'Non renseigne'],
        ['label' => 'Sujet', 'value' => $payload['subject']],
        ['label' => 'Page source', 'value' => $payload['source_page'] !== '' ? $payload['source_page'] : 'Formulaire de contact'],
        ['label' => 'Adresse IP', 'value' => $payload['ip_address'] ?? 'Indisponible'],
    ];

    $rowsHtml = '';
    foreach ($detailsRows as $row) {
        $rowsHtml .= '<tr>'
            . '<td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#111827;width:160px;">' . escapeHtml($row['label']) . '</td>'
            . '<td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#374151;">' . escapeHtml((string) $row['value']) . '</td>'
            . '</tr>';
    }

    $content = ''
        . '<div style="margin-bottom:24px;padding:18px 20px;border-radius:18px;background:#f9fafb;border:1px solid #eceff3;">'
        . '<p style="margin:0;font-size:15px;line-height:1.7;color:#374151;">Un nouveau contact a ete soumis depuis le portfolio. Vous pouvez repondre directement a cet e-mail pour revenir vers le prospect.</p>'
        . '</div>'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">'
        . $rowsHtml
        . '</table>'
        . '<div style="margin-top:24px;padding:22px 24px;border-radius:18px;background:#111111;">'
        . '<div style="margin:0 0 10px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#f8d49a;">Message</div>'
        . '<div style="font-size:15px;line-height:1.8;color:#ffffff;">' . formatHtmlParagraphs($payload['message']) . '</div>'
        . '</div>';

    $html = buildEmailLayout(
        'Nouveau message recu depuis le portfolio',
        'Nouveau message recu depuis le portfolio',
        'Un prospect vient de vous ecrire depuis votre formulaire de contact.',
        $content,
        'Portfolio Romaric BOMBADE'
    );

    $altBody = implode(
        "\n",
        [
            'Nouveau message recu depuis le portfolio',
            'ID message : #' . $messageId,
            'Nom : ' . $payload['name'],
            'Email : ' . $payload['email'],
            'Telephone : ' . ($payload['phone'] !== '' ? $payload['phone'] : 'Non renseigne'),
            'Sujet : ' . $payload['subject'],
            'Page source : ' . ($payload['source_page'] !== '' ? $payload['source_page'] : 'Formulaire de contact'),
            'Adresse IP : ' . ($payload['ip_address'] ?? 'Indisponible'),
            '',
            'Message :',
            $payload['message'],
        ]
    );

    return [
        'subject' => $subject,
        'html' => $html,
        'text' => $altBody,
    ];
}

/**
 * Build the acknowledgment email sent to the visitor.
 */
function buildUserEmailContent(array $payload): array
{
    $subject = 'Votre message a bien ete recu';

    $content = ''
        . '<div style="margin-bottom:24px;padding:18px 20px;border-radius:18px;background:#f9fafb;border:1px solid #eceff3;">'
        . '<p style="margin:0;font-size:15px;line-height:1.7;color:#374151;">Bonjour ' . escapeHtml($payload['name']) . ', merci pour votre message. Je l\'ai bien recu et je reviens vers vous des que possible.</p>'
        . '</div>'
        . '<div style="padding:22px 24px;border-radius:18px;background:#fff7ed;border:1px solid #fed7aa;margin-bottom:22px;">'
        . '<div style="margin:0 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#c2410c;">Recapitulatif</div>'
        . '<p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#431407;"><strong>Sujet :</strong> ' . escapeHtml($payload['subject']) . '</p>'
        . '<p style="margin:0;font-size:15px;line-height:1.8;color:#431407;"><strong>Votre message :</strong><br>' . formatHtmlParagraphs($payload['message']) . '</p>'
        . '</div>'
        . '<div style="padding:20px 22px;border-radius:18px;background:#111111;">'
        . '<div style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#f8d49a;margin-bottom:10px;">Suite</div>'
        . '<p style="margin:0;font-size:15px;line-height:1.8;color:#ffffff;">Si votre demande concerne une mission, un devis ou un accompagnement technique, je vous ferai un retour avec les prochaines etapes adaptees a votre besoin.</p>'
        . '</div>';

    $html = buildEmailLayout(
        'Votre message a bien ete recu',
        'Merci pour votre prise de contact',
        'Votre demande est bien enregistree. Je vous recontacte tres rapidement.',
        $content,
        'Romaric BOMBADE | Developpeur Full-Stack'
    );

    $altBody = implode(
        "\n",
        [
            'Bonjour ' . $payload['name'] . ',',
            '',
            'Votre message a bien ete recu. Je vous recontacte tres rapidement.',
            '',
            'Sujet : ' . $payload['subject'],
            'Votre message :',
            $payload['message'],
            '',
            'Romaric BOMBADE',
        ]
    );

    return [
        'subject' => $subject,
        'html' => $html,
        'text' => $altBody,
    ];
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
    $password = preg_replace('/\s+/', '', (string) ($smtp['password'] ?? '')) ?? '';
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
    $mailer->Port = (int) ($smtp['port'] ?? 587);

    $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
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
 * Create a configured PHPMailer instance.
 */
function createMailer(array $config): PHPMailer
{
    $mail = new PHPMailer(true);
    configureMailer($mail, $config['mail'] ?? []);

    return $mail;
}

/**
 * Send the owner notification email.
 */
function sendOwnerNotification(array $config, array $payload, int $messageId): void
{
    $recipient = $config['recipient'] ?? [];
    $recipientEmail = trim((string) ($recipient['email'] ?? ''));
    $recipientName = trim((string) ($recipient['name'] ?? ''));

    if ($recipientEmail === '') {
        throw new RuntimeException('Aucune adresse destinataire n\'est configuree.');
    }

    $mail = createMailer($config);
    $mail->addAddress($recipientEmail, $recipientName);
    $mail->addReplyTo($payload['email'], $payload['name']);
    $mail->isHTML(true);

    $content = buildOwnerEmailContent($payload, $messageId);
    $mail->Subject = $content['subject'];
    $mail->Body = $content['html'];
    $mail->AltBody = $content['text'];

    $mail->send();
}

/**
 * Send an acknowledgment email to the visitor.
 */
function sendUserAcknowledgement(array $config, array $payload): void
{
    $mail = createMailer($config);
    $mail->addAddress($payload['email'], $payload['name']);
    $mail->isHTML(true);

    $content = buildUserEmailContent($payload);
    $mail->Subject = $content['subject'];
    $mail->Body = $content['html'];
    $mail->AltBody = $content['text'];

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
    $driver = $databaseConfig['driver'] ?? 'mysql';
    $pdo = createDatabaseConnection($databaseConfig);
    ensureMessagesTable($pdo, $driver);
    $messageId = storeMessage($pdo, $payload);
} catch (Throwable $exception) {
    respond(500, ['success' => false, 'message' => 'Impossible d\'enregistrer votre message pour le moment.']);
}

$mailRequired = (bool) ($config['mail']['require_success'] ?? false);

try {
    sendOwnerNotification($config, $payload, $messageId);
    $userAcknowledgementSent = false;

    try {
        sendUserAcknowledgement($config, $payload);
        $userAcknowledgementSent = true;
        updateMailStatus($pdo, $messageId, 'sent');
    } catch (Throwable $exception) {
        updateMailStatus($pdo, $messageId, 'owner_sent_ack_failed', mb_substr($exception->getMessage(), 0, 2000));
    }

    $successMessage = $userAcknowledgementSent
        ? 'Votre message a bien ete recu. Un e-mail de confirmation vous a ete envoye et je vous recontacte tres rapidement.'
        : 'Votre message a bien ete recu. Je vous recontacte tres rapidement.';

    respond(
        200,
        [
            'success' => true,
            'message' => $successMessage,
        ]
    );
} catch (Throwable $exception) {
    updateMailStatus($pdo, $messageId, 'failed', mb_substr($exception->getMessage(), 0, 2000));

    if ($mailRequired) {
        respond(
            500,
            [
                'success' => false,
                'message' => 'Votre message est enregistre, mais la notification e-mail a rencontre un probleme.',
            ]
        );
    }

    respond(
        200,
        [
            'success' => true,
            'message' => 'Votre message est bien enregistre. Je pourrai activer la notification e-mail des que la configuration SMTP sera finalisee.',
        ]
    );
}
