<?php

declare(strict_types=1);

return [
    'recipient' => [
        'email' => 'dromaric58@gmail.com',
        'name' => 'Romaric BOMBADE',
    ],
    'database' => [
        // Supported drivers: sqlite, mysql
        'driver' => 'mysql',
        'sqlite_path' => __DIR__ . '/../storage/contact-messages.sqlite',
        'mysql' => [
            'host' => '127.0.0.1',
            'port' => 3306,
            'database' => 'portfolio',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8mb4',
        ],
    ],
    'mail' => [
        // Gmail personnel: activez la validation en 2 etapes puis creez un mot de passe d'application.
        // Collez le mot de passe d'application ci-dessous, sans espaces si possible.
        'require_success' => false,
        'transport' => 'smtp',
        'smtp' => [
            'host' => 'smtp.gmail.com',
            'port' => 587,
            'encryption' => 'tls',
            'username' => 'dromaric58@gmail.com',
            'password' => '',
            'from_email' => 'dromaric58@gmail.com',
            'from_name' => 'Portfolio Romaric BOMBADE',
        ],
    ],
];


