document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.getElementById("index-items");
    const items = itemsContainer.getElementsByClassName("item");
    const searchInput = document.querySelector("#search input[type='search']");
    const filterCheckboxes = document.querySelectorAll("#filters input[type='checkbox']");
    const lilypads = document.querySelectorAll("#lilypads figure");
    const indexItems = document.querySelectorAll("#index-items .item");
    const feedContainer = document.getElementById("feed");
    const body = document.body;

    // Sections and navigation buttons
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");
    const indexSection = document.getElementById("index");
    const aboutButton = document.getElementById("about-btn");
    const contactButton = document.getElementById("contact-btn");
    const indexButton = document.getElementById("index-btn");
    const aboutCloseButton = aboutSection.querySelector(".close-section");
    const contactCloseButton = contactSection.querySelector(".close-section");
    const indexCloseButton = indexSection.querySelector(".close-section");

    // Shared array to track selected projects
    const selectedProjects = [];

    // Toggle body overflow when a section is opened/closed
    function setBodyOverflow(hidden) {
        body.style.overflow = hidden ? "hidden" : "";
    }

    // Function to toggle section visibility
    function toggleSection(section, visible) {
        section.classList.toggle("visible", visible);
        setBodyOverflow(visible);
    }

    // Event listeners to control section visibility
    aboutButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSection(aboutSection, true);
    });
    aboutCloseButton.addEventListener("click", function () {
        toggleSection(aboutSection, false);
    });
    contactButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSection(contactSection, true);
    });
    contactCloseButton.addEventListener("click", function () {
        toggleSection(contactSection, false);
    });
    indexButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleSection(indexSection, true);
    });
    indexCloseButton.addEventListener("click", function () {
        toggleSection(indexSection, false);
    });

    // Function to filter and search items
    function filterAndSearchItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedFilters = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());

        // Iterate over each item
        for (let item of items) {
            const title = item.querySelector(".title").innerText.toLowerCase();
            const tagsAndDate = item.querySelector(".tag-and-date").innerText.toLowerCase();

            // Check if the item matches the search term and all selected filters
            const matchesSearch = title.includes(searchTerm);
            const matchesFilters = selectedFilters.every(filter => tagsAndDate.includes(filter));

            // Show or hide the item based on search and filter criteria
            if (matchesSearch && (selectedFilters.length === 0 || matchesFilters)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    }

    // Add event listeners for search input and checkboxes
    searchInput.addEventListener("input", filterAndSearchItems);
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterAndSearchItems);
    });

    // Function to create an HTML representation of the project's content
    function createProjectContent(project) {
        const projectElement = document.createElement("div");
        projectElement.classList.add("feed-item");
        projectElement.setAttribute("id", `feed-${project.slug}`);

        // Generate HTML for the project's cover image if it exists
        const coverHtml = project.cover && project.cover.value ? 
            `<img src="${project.cover.value}" alt="${project.title} Cover">` : "";

        // Generate HTML for the layouts by joining them together
        const layoutsHtml = project.layouts ? project.layouts.join('') : '';

        projectElement.innerHTML = `
            <h1 class="project-title">${project.title}</h1>
            ${layoutsHtml}
        `;

        return projectElement;
    }

    // Function to fetch and reorder a project to the top without removing it
    async function fetchAndReorderProject(slug) {
        try {
            const index = selectedProjects.findIndex(item => item.slug === slug);

            if (index !== -1) {
                // Move existing project to the top
                const existingProject = selectedProjects.splice(index, 1)[0];
                selectedProjects.unshift(existingProject);
            } else {
                // Fetch and add the new project to the top of the list
                const response = await fetch(`/projects/${slug}.json`);
                const project = await response.json();
                project.slug = slug;
                selectedProjects.unshift(project);
            }

            // Update the feed to reflect the current order
            updateFeed();
        } catch (error) {
            console.error(`Error fetching project ${slug}:`, error);
        }
    }

    // Function to fetch and toggle a project (open or close)
    async function fetchAndToggleProject(slug) {
        const index = selectedProjects.findIndex(item => item.slug === slug);

        if (index !== -1) {
            // Remove existing project to toggle it off
            selectedProjects.splice(index, 1);
            document.getElementById(`feed-${slug}`).remove();
        } else {
            // Fetch and add the new project
            await fetchAndReorderProject(slug);
        }

        updateFeed();
    }

    // Update the feed by appending projects in selection order
    function updateFeed() {
        feedContainer.innerHTML = "";
        selectedProjects.forEach((project) => {
            const projectContent = createProjectContent(project);
            feedContainer.appendChild(projectContent);
        });
    }

    // Add event listeners to index items
    indexItems.forEach(item => {
        item.addEventListener("click", function () {
            const slug = item.id;
            item.classList.toggle("selected");
            fetchAndToggleProject(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top smoothly
        });
    });

    // Add event listeners to lilypad figures
    lilypads.forEach(lilypad => {
        lilypad.addEventListener("click", function () {
            const slug = lilypad.id;

            // Ensure the index item is selected
            const indexItem = document.getElementById(slug);
            if (indexItem) {
                indexItem.classList.add("selected");
            }

            fetchAndReorderProject(slug); // Reorder but don't toggle off
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top smoothly
        });
    });

    // Event listener to remove feed items via the "Remove" button
    feedContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("toggle-feed-item")) {
            const feedItem = event.target.parentElement;
            const slug = feedItem.id.replace("feed-", "");
            feedItem.remove();
            // Remove the project from the selectedProjects array
            const index = selectedProjects.findIndex(item => item.slug === slug);
            if (index !== -1) {
                selectedProjects.splice(index, 1);
            }
        }
    });
});
