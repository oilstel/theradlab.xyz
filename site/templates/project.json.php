<?php

// Get the current project page
$page = page();

// Prepare data in an associative array, excluding HTML content
$data = [
    'title' => (string)$page->title(), // Retrieve the title

    // Retrieve the cover image's URL if available
    'cover' => $page->cover()->isNotEmpty() ? $page->cover()->first()->url() : null,

    // Initialize an empty array to store layouts
    'layouts' => []
];

// Retrieve and loop through each layout from the layout field
foreach ($page->layout()->toLayouts() as $layout) {
    // Initialize a variable to hold the HTML of this layout
    $layoutHtml = '<div class="layout-grid" id="' . esc($layout->id()) . '">';

    // Loop through each column in the layout
    foreach ($layout->columns() as $column) {
        // Start each column div with a calculated width
        $layoutHtml .= '<div class="column" style="--span:' . esc($column->width()) . '">';

        // Loop through each block in the column and convert to HTML
        foreach ($column->blocks() as $block) {
            // Add the block's HTML to the column
            $layoutHtml .= '<div class="block block-type-' . esc($block->type()) . '">' . $block->toHtml() . '</div>';
        }

        // Close the column div
        $layoutHtml .= '</div>';
    }

    // Close the layout section
    $layoutHtml .= '</div>';

    // Add this layout's HTML to the layouts array
    $data['layouts'][] = $layoutHtml;
}

// Output the entire data array as JSON
echo json_encode($data);
