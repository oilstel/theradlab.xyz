<?php

$kirby->response()->type('application/json');

$data = [
    'title' => 'Projects',
    'projects' => []
];

$entries = page('entries')->children()->listed();

foreach ($entries as $entry) {
    if (!$entry->hide_from_index()->bool()) {  // Check if hide_from_index is false
        $data['projects'][] = [
            'title' => $entry->title()->value(),
            'authors' => $entry->authors()->value(),
            'type' => $entry->type()->value(),
            'tags' => $entry->tags()->split(', '),
            'startDate' => $entry->startDate()->isNotEmpty() ? $entry->startDate()->value() : null,
            'endDate' => $entry->endDate()->isNotEmpty() ? $entry->endDate()->value() : null,
            'slug' => $entry->slug()
        ];
    }
}

echo json_encode($data);
