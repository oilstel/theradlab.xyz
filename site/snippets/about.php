<!-- About -->
<section id="about">
    <button class="close-section">Close</button>

    <article class="page-content">
        <div id="intro">
            <?= page('about')->intro(); ?>
        </div>
        <div id="quick-links">
            <?= page('about')->quickLinks(); ?>
        </div>
        <?php foreach (page('about')->layout()->toLayouts() as $layout): ?>
            <div class="layout-grid" id="<?= esc($layout->id()) ?>">
                <?php foreach ($layout->columns() as $column): ?>
                    <div class="column" style="--span:<?= esc($column->span(2)) ?>">
                        <?php foreach ($column->blocks() as $block): ?>
                            <div class="block block-type-<?= esc($block->type()) ?>">
                                <?php if ($block->type() == 'heading'): ?>
                                    <?php
                                    // Retrieve data from the block
                                    $level = $block->level()->value(); // h2 or h2 italic
                                    $headerId = esc($block->headerId());
                                    $text = $block->text()->html();

                                    // Determine if this is italicized
                                    if ($level === 'h2Italic') {
                                        // Create italicized heading
                                        echo "<h2 id=\"$headerId\"><i>$text</i></h2>";
                                    } else {
                                        // Create regular heading
                                        echo "<h2 id=\"$headerId\">$text</h2>";
                                    }
                                    ?>
                                <?php else: ?>
                                    <?= $block ?>
                                <?php endif ?>
                            </div>
                        <?php endforeach ?>
                    </div>
                <?php endforeach ?>
            </div>
        <?php endforeach ?>
    </article>
</section>
