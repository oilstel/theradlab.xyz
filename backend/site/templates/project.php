<?php

$kirby->response()->type('application/json');

// Get the current project page
$page = page();

// Get the site's URL
$siteUrl = $kirby->url('index');

// Prepare data in an associative array, excluding HTML content
$data = [
    'title' => (string)$page->title(), // Retrieve the title
    'image' => $page->cover()->isNotEmpty() ? $page->cover()->first()->toFile()->url() : null, // Retrieve the cover image's URL if available
    'startDate' => $page->startDate()->isNotEmpty() ? $page->startDate()->value() : null, // Retrieve start date if available
    'endDate' => $page->endDate()->isNotEmpty() ? $page->endDate()->value() : null, // Retrieve end date if available
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
        $layoutHtml .= '<div class="column" style="--span:' . esc($column->span(2)) . '">';

        // Loop through each block in the column and convert to HTML
        foreach ($column->blocks() as $block) {
            // Check if the block is a heading
            if ($block->type() == 'heading') {
                // Retrieve data from the heading block
                $level = $block->level()->value(); // e.g., h2 or h2Italic
                $headerId = esc($block->headerId());
                $text = $block->text()->html();

                // Determine if this is italicized
                if ($level === 'h2Italic') {
                    // Create italicized heading
                    $layoutHtml .= "<div class=\"block block-type-heading\"><h2 id=\"$headerId\"><i>$text</i></h2></div>";
                } else {
                    // Create regular heading
                    $layoutHtml .= "<div class=\"block block-type-heading\"><h2 id=\"$headerId\">$text</h2></div>";
                }
            } elseif ($block->type() == 'external-link') {
                // Retrieve data from the external link block
                $title = $block->title()->html();
                $url = $block->url()->value();

                // Create external link block
                $layoutHtml .= '<div class="block block-type-external-link">';
                $layoutHtml .= '<a href="' . esc($url) . '" target="_blank" rel="noopener noreferrer">' . $title . '</a>';
                $layoutHtml .= '</div>';
            } else {
                // Default handling for other block types
                $layoutHtml .= '<div class="block block-type-' . esc($block->type()) . '">' . $block->toHtml() . '</div>';
            }
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
