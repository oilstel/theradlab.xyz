
<?php snippet('meta') ?>

<main>
    <nav>
        <a id="site-title"><img src="/assets/images/logo.svg" alt="The Rad Lab"></a>
        <a id="about-btn">About</a>
        <a id="contact-btn">Contact</a>
    </nav>

    <!-- Index -->
    <section id="index">
        <button class="close-section">Close</button>

        <h1>Index</h1>

        <div id="index-inner">
            <div id="search-and-filters">
                <div id="search">
                    <span class="descriptor">Search by</span> <input type="text" placeholder="anything">
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
                            // Handle tags to avoid trailing commas
                            $tags = $project->tags()->isNotEmpty() ? $project->tags()->split(',') : [];

                            // Use a loop to generate a list of tags with proper separation
                            $tagsOutput = '';
                            if (!empty($tags)) {
                                $tagsOutput = esc(implode(', ', array_map('trim', $tags)));
                            } else {
                                $tagsOutput = 'No tags';
                            }

                            // Ensure date field is not empty before outputting
                            $date = $project->date()->isNotEmpty() ? esc($project->date()->toDate('Y')) : 'Unknown date';

                            echo "$tagsOutput, $date";
                            ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="about">
        <button class="close-section">Close</button>

        <article>
            
        </article>
    </section>

    <!-- Contact -->
    <section id="contact">
        <button class="close-section">Close</button>

        <article>
            
        </article>
    </section>

    <img src="https://d2w9rnfcy7mm78.cloudfront.net/27992858/original_1886204428be78122fc0ea69df09866d.jpg?1715162752?bc=0" alt="" id="test">
</main>

<!-- Footer -->
<?php snippet('footer') ?>