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

            $slug = $selectedProject ? $selectedProject->slug() : null;
            $blockData = [
                'title' => $selectedProject ? $selectedProject->title()->value() : null,
                'slug' => $slug,
                'type' => $block->displayAsTextLilypad()->bool() ? 'text' : 'image',
                'image' => $imageUrl,
                'textSubtitle' => $block->lilypadSubtitle()->value(),
                'alignment' => $block->displayAsTextLilypad()->bool() ? null : $block->alignment()->value(),
                'size' => $block->size()->value(),
                'empty' => empty($slug)
            ];

            $rowData['block'][] = $blockData;
        }

        $layoutData['blocks'][] = $rowData;
    }

    $data['layouts'][] = $layoutData;
}

// Output the data as JSON
echo json_encode($data);
?>
