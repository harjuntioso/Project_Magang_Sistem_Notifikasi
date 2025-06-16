<?php

use Laravel\Sanctum\Sanctum;

return [

    'stateful_domains' => [
        'https://client.test:3000',
        'https://server.test',
        'server.test',
        // '127.0.0.1:8000',
        // 'your-frontend-domain.com',
    ],

    'guard' => ['web'],

    'expiration' => null,

    'middleware' => [
        'verify_csrf_token' => \App\Http\Middleware\VerifyCsrfToken::class, 
        'encrypt_cookies' => \App\Http\Middleware\EncryptCookies::class,     
    ],

];