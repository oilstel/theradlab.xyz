<!-- site/templates/default.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Kirby Site</title>
    <link rel="stylesheet" href="<?= url('assets/css/style.css') ?>">
</head>
<body>
    <?php snippet('header') ?>

    default

    <div id="app">
        <router-view></router-view>
    </div>

    <?php snippet('footer') ?>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.js"></script>
    <script src="<?= url('assets/js/components.js') ?>"></script>
    <script src="<?= url('assets/js/main.js') ?>"></script>
</body>
</html>
