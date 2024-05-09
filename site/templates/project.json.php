<?php

// Get the current project page
$page = page();

// Prepare data in an associative array, excluding HTML content
$data = [
    'title' => (string)$page->title(), // Retrieve the title

    // Retrieve the cover image's URL if available
    'cover' => $page->cover()->isNotEmpty() ? $page->cover()->first()->url() : null,

    // Initialize an empty array to store blocks
    'blocks' => []
];

// Loop through each block, convert to HTML, and add to the JSON array
foreach ($page->blocks()->toBlocks() as $block) {
    // Convert each block to its HTML representation using Kirby's toHtml method
    $blockHtml = $block->toHtml();

    // Add this HTML block to the blocks array
    $data['blocks'][] = $blockHtml;
}

// Output the entire data array as JSON
echo json_encode($data);
