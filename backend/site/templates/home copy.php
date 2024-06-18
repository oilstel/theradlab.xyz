<?php

$kirby->response()->type('application/json');

// Prepare data for the homepage
$data = [
    'title' => $site->title()->value(),
    'layouts' => []
];

// Fetch the 'Lilypads' section from the homepage
$homepageProjects = $page->find('homepage')->section('homepageProjects');

if ($homepageProjects) {
    foreach ($homepageProjects->layouts() as $layout) {
        $layoutData = [
            'type' => $layout->name(),
            'columns' => []
        ];

        foreach ($layout->columns() as $column) {
            $columnData = [
                'width' => $column->width(),
                'blocks' => []
            ];

            foreach ($column->blocks() as $block) {
                $blockData = [
                    'title' => $block->title()->value(),
                    'url' => $block->url()->value(),
                    'selectedProject' => $block->selectedProject()->toPage()->title()->value(),
                    'displayAsTextLilypad' => $block->displayAsTextLilypad()->value(),
                    'lilypadSubtitle' => $block->lilypadSubtitle()->value(),
                    'alignment' => $block->alignment()->value(),
                    'size' => $block->size()->value()
                ];

                $columnData['blocks'][] = $blockData;
            }

            $layoutData['columns'][] = $columnData;
        }

        $data['layouts'][] = $layoutData;
    }
}

// Output the data as JSON
echo json_encode($data);
?>
