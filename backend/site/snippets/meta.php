<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <?= css('assets/css/fonts.css?v=1.9') ?>
    <?= css('assets/css/global.css?v=1.9') ?>
    <title><?= $site->title() ?></title>
    <meta name="description" content="<?= $site->siteDescription() ?>">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/images/RADLab_Favicon.png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= $site->title() ?>">
    <meta name="twitter:description" content="<?= $site->siteDescription() ?>">
    <meta name="twitter:image" content="<?= $site->url() ?>/assets/images/RADLab_SocialShare.png">

    <!-- Facebook -->
    <meta property="og:title" content="<?= $site->title() ?>">
    <meta property="og:description" content="<?= $site->siteDescription() ?>">
    <meta property="og:image" content="<?= $site->url() ?>/assets/images/RADLab_SocialShare.png">
    <meta property="og:url" content="<?= $site->url() ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="<?= $site->title() ?>">
</head>

<body id="<?= $page->parent() ? $page->parent()->slug() : $page->slug() ?>">