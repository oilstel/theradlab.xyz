<?php

// Allow cross origin
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
header("HTTP/1.1 200 OK");
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type, authorization, origin, x-requested-with');
header('Access-Control-Allow-Methods', 'GET, OPTIONS');

// site/config/config.php
return [
    'debug' => true,
    'panel' => [
        'install' => false,
    ],
    'api' => true, // Disable built-in API
    'routes' => [
        // Custom API routes
        [
            'pattern' => 'kirby-api/projects',
            'action'  => function () {
                return page('projects')->render();
            }
        ],
        [
            'pattern' => 'kirby-api/about',
            'action'  => function () {
                return page('about')->render();
            }
        ]
    ],
];

