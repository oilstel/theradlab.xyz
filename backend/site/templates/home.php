<?php

$kirby->response()->type('application/json');

// Prepare data for the homepage
$data = [
    'title' => $site->title()->value(),
    'layouts' => []
];

foreach ($site->layout()->toLayouts() as $layout) {
    // Assume first column's width for the entire layout
    $firstColumn = $layout->columns()->first();
    $layoutWidth = $firstColumn ? ($firstColumn->span(2) == 1 ? 'half' : 'full') : '';

    $layoutData = [
        'width' => $layoutWidth,
        'blocks' => []
    ];

    foreach ($layout->columns() as $column) {
        $rowData = [
            'block' => []
        ];

        foreach ($column->blocks() as $block) {
            $selectedProject = $block->selectedProject()->isNotEmpty() ? $block->selectedProject()->toPage() : null;

            $imageUrl = null;
            if ($selectedProject) {
                $coverFile = $selectedProject->cover()->toFile();
                if ($coverFile) {
                    $imageUrl = $coverFile->url();
                } else {
                    $firstImage = $selectedProject->images()->first();
                    if ($firstImage) {
                        $imageUrl = $firstImage->url();
                    }
                }
            }

            $blockData = [
                'title' => $selectedProject ? $selectedProject->title()->value() : null,
                'slug' => $selectedProject ? $selectedProject->slug() : null,
                'type' => $block->displayAsTextLilypad()->bool() ? 'text' : 'image',
                'image' => $imageUrl,
                'textSubtitle' => $block->lilypadSubtitle()->value(),
                'alignment' => $block->displayAsTextLilypad()->bool() ? null : $block->alignment()->value(),
                'size' => $block->size()->value()
            ];

            // Check if blockData is not empty before adding it to rowData
            if (!empty($blockData['title']) || !empty($blockData['slug']) || !empty($blockData['type']) || !empty($blockData['image']) || !empty($blockData['textSubtitle']) || !empty($blockData['alignment']) || !empty($blockData['size'])) {
                $rowData['block'][] = $blockData;
            }
        }

        // Check if rowData['block'] is not empty before adding it to layoutData['blocks']
        if (!empty($rowData['block'])) {
            $layoutData['blocks'][] = $rowData;
        }
    }

    // Check if layoutData['blocks'] is not empty before adding it to data['layouts']
    if (!empty($layoutData['blocks'])) {
        $data['layouts'][] = $layoutData;
    }
}

// Output the data as JSON
echo json_encode($data);
?>
