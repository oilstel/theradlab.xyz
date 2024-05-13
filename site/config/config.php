<?php

return [
    'debug' => true,
    'panel' => [
        'install' => true
    ],

    // Define custom routes
    'routes' => [
        [
            'pattern' => 'projects/([a-zA-Z0-9\-]+)',
            'action'  => function ($slug) {
                // Redirect to the home page with the project slug as a query parameter
                return go('?p=' . urlencode($slug));
            }
        ]
    ]
];
