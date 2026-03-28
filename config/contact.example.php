<?php

declare(strict_types=1);

return [
    'recipient' => [
        'email' => 'dromaric58@gmail.com',
        'name' => 'Romaric BOMBADE',
    ],
    'database' => [
        // Supported drivers: sqlite, mysql
        'driver' => 'sqlite',
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
        // Set to true if the visitor must get an error when email delivery fails.
        'require_success' => false,
        'transport' => 'smtp',
        'smtp' => [
            'host' => 'smtp.gmail.com',
            'port' => 465,
            'encryption' => 'ssl',
            'username' => 'dromaric58@gmail.com',
            'password' => '',
            'from_email' => 'dromaric58@gmail.com',
            'from_name' => 'Portfolio Romaric BOMBADE',
        ],
    ],
];
