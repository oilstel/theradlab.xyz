<?php

$kirby->response()->type('application/json');

// Prepare data for the homepage
$data = [
    'title' => $site->title()->value(),
    'lilypads' => []
];

// Fetch selected projects for lilypads
$lilypads = $site->selectedProjects()->toPages();
foreach ($lilypads as $lilypad) {
    $data['lilypads'][] = [
        'title' => $lilypad->title()->value(),
        'authors' => $lilypad->authors()->value(),
        'tags' => $lilypad->tags()->value(),
        'date' => $lilypad->date()->value(),
        'image' => $lilypad->cover()->toFile() ? $lilypad->cover()->toFile()->url() : ($lilypad->images()->first() ? $lilypad->images()->first()->url() : null),
        'slug' => $lilypad->slug(),
        'text_lilypad' => $lilypad->displayAsTextLilypad()->toBool(), // Convert boolean to JSON-compatible format
        'subtitle' => $lilypad->lilypadSubtitle()->value()
    ];
}

// Output the data as JSON
echo json_encode($data);
?>
