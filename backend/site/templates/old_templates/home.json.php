
<?php snippet('meta') ?>

<main>
    <nav>
        <a href="#" id="site-title"></a>
        <a id="index-btn">Index</a>
        <a id="about-btn">About</a>
        <a id="contact-btn" href="mailto:amy@theradlab.xyz">Contact</a>
    </nav>

    <!-- Index -->
    <section id="index">
        <button class="close-section">Close</button>

        <h1>Index</h1>

        <div id="index-inner">
            <div id="search-and-filters">
                <div id="search">
                    <span class="descriptor">Search by</span> <input type="search" placeholder="anything">
                </div>

                <?php
                    // Get all tags from projects as filters
                    $projectsPage = page('projects');
                    $allTags = [];

                    $projects = $projectsPage ? $projectsPage->children()->listed() : [];

                    foreach ($projects as $project) {
                        $projectTags = $project->tags()->split(',');
                        $allTags = array_merge($allTags, $projectTags);
                    }

                    $uniqueTags = array_unique(array_map('trim', $allTags));

                    sort($uniqueTags);
                ?>

                <div id="filters">
                    <span class="descriptor">Filter by</span>
                    <?php foreach ($uniqueTags as $tag): ?>
                        <div class="filter">
                            <input type="checkbox" id="<?php echo esc($tag); ?>" name="filters[]" value="<?php echo esc($tag); ?>">
                            <label for="<?php echo esc($tag); ?>"><?php echo ucfirst(esc($tag)); ?></label>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <?php
                $projectsPage = page('projects');
                $projects = $projectsPage ? $projectsPage->children()->listed() : [];
            ?>

            <div id="index-items">
                <?php foreach ($projects as $project): ?>
                    <!-- Adding the slug as the `id` attribute of the outer `div` -->
                    <div class="item" id="<?php echo esc($project->slug()); ?>">
                        <!-- Title -->
                        <div class="title"><?php echo esc($project->title()); ?></div>

                        <!-- Authors -->
                        <?php if ($project->authors()->isNotEmpty()): ?>
                            <div class="authors">
                                <?php
                                // Convert the authors string to an array by splitting on commas
                                $authorsArray = array_map('trim', explode(',', $project->authors()->value()));

                                // Join the authors array into a single string separated by commas
                                echo esc(implode(', ', $authorsArray));
                                ?>
                            </div>
                        <?php endif; ?>

                        <!-- Tags and Date -->
                        <div class="tag-and-date">
                            <?php
                            // Retrieve and clean the tags
                            $tags = $project->tags()->isNotEmpty() ? $project->tags()->split(',') : [];
                            $tagsArray = array_map('trim', $tags);

                            // Generate the tag list without trailing commas
                            $tagsOutput = !empty($tagsArray) ? esc(implode(', ', $tagsArray)) : '';

                            // Retrieve the date and convert it to the desired format
                            $date = $project->date()->isNotEmpty() ? esc($project->date()->toDate('Y')) : '';

                            // Prepare the final output with a conditional comma before the date
                            if (!empty($tagsArray) && !empty($date)) {
                                // Both tags and date are available
                                $finalOutput = "$tagsOutput, $date";
                            } else {
                                // Output tags or date separately
                                $finalOutput = !empty($date) ? $tagsOutput . ', ' . $date : $tagsOutput;
                            }

                            // Display the final result
                            echo $finalOutput;
                            ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- About -->
    <?php snippet('about') ?>

    <!-- Contact -->
    <section id="contact">
        <button class="close-section">Close</button>

        <article>
            
        </article>
    </section>

    <!-- Feed of projects loaded from index -->
    <div id="feed" class="page-content">

    </div>

    <!-- Lilypads -->
    <div id="lilypads">
        <?php foreach ($site->selectedProjects()->toPages() as $project): ?>
            <figure id="<?= $project->slug() ?>">
                <?php
                // Attempt to find the cover image
                $cover = $project->cover()->toFile();
                
                // Fallback to the first image if no cover is specified
                if (!$cover) {
                    $cover = $project->images()->first();
                }

                // If an image is found, display it
                if ($cover): ?>
                    <img src="<?= $cover->url() ?>" alt="<?= $cover->alt() ?>">
                <?php endif; ?>
                
                <figcaption><?= $project->title()->html() ?></figcaption>
            </figure>
        <?php endforeach; ?>
    </div>


</main>

<!-- Footer -->
<?php snippet('footer') ?>