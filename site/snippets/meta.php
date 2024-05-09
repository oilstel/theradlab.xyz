<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= css('assets/css/fonts.css?v=1.8') ?>
    <?= css('assets/css/global.css?v=1.8') ?>
    <?php
    if(page()->template() == 'home') {
        echo css('assets/css/home.css?v=1.0');
    }
    ?>
    <title><?= $site->title() ?></title>
    <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
</head>

<body id="<?= $page->parent() ? $page->parent()->slug() : $page->slug() ?>">