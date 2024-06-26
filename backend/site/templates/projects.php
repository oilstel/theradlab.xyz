<?php

$kirby->response()->type('application/json');

$data = [
    'title' => 'Projects',
    'projects' => []
];

$projects = page('projects')->children()->listed();

foreach ($projects as $project) {
    if (!$project->hide_from_index()->bool()) {  // Check if hide_from_index is false
        $data['projects'][] = [
            'title' => $project->title()->value(),
            'authors' => $project->authors()->value(),
            'tags' => $project->tags()->value(),
            'startDate' => $project->startDate()->isNotEmpty() ? $project->startDate()->value() : null,
            'endDate' => $project->endDate()->isNotEmpty() ? $project->endDate()->value() : null,
            'slug' => $project->slug()
        ];
    }
}

echo json_encode($data);
