<?php

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// Define paths for static assets
$staticPaths = [
    '/js',
    '/css',
    '/fonts',
    '/images'
];

// Check if the request is for a static file
foreach ($staticPaths as $path) {
    if (strpos($uri, $path) === 0 && file_exists(__DIR__ . $uri)) {
        return false; // Serve the requested file
    }
}

// All other requests go to index.html
$_SERVER['SCRIPT_NAME'] = '/index.html';
require __DIR__ . '/index.html';
