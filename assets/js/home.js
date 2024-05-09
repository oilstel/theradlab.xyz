document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.getElementById("index-items");
    const items = itemsContainer.getElementsByClassName("item");
    const searchInput = document.querySelector("#search input[type='text']");
    const filterCheckboxes = document.querySelectorAll("#filters input[type='checkbox']");

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






});


// Show and hide sections
document.addEventListener("DOMContentLoaded", function () {
    // References to the sections
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");
    const indexSection = document.getElementById("index");

    // References to the buttons
    const aboutButton = document.getElementById("about-btn");
    const contactButton = document.getElementById("contact-btn");
    const indexButton = document.getElementById("index-btn");

    // Close buttons inside each section
    const aboutCloseButton = aboutSection.querySelector(".close-section");
    const contactCloseButton = contactSection.querySelector(".close-section");
    const indexCloseButton = indexSection.querySelector(".close-section");

    // Toggle About section visibility
    function openAbout() {
        aboutSection.classList.add("visible");
    }

    function closeAbout() {
        aboutSection.classList.remove("visible");
    }

    // Toggle Contact section visibility
    function openContact() {
        contactSection.classList.add("visible");
    }

    function closeContact() {
        contactSection.classList.remove("visible");
    }

    // Toggle Index section visibility
    function openIndex() {
        indexSection.classList.add("visible");
    }

    function closeIndex() {
        indexSection.classList.remove("visible");
    }

    // Event listeners for opening and closing sections
    aboutButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default navigation
        openAbout();
    });

    aboutCloseButton.addEventListener("click", function () {
        closeAbout();
    });

    contactButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default navigation
        openContact();
    });

    contactCloseButton.addEventListener("click", function () {
        closeContact();
    });

    indexButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default navigation
        openIndex();
    });

    indexCloseButton.addEventListener("click", function () {
        closeIndex();
    });
});









document.addEventListener("DOMContentLoaded", function () {
    const indexItems = document.querySelectorAll("#index-items .item");
    const feedContainer = document.getElementById("feed");

    // Keeps track of selected projects in an ordered list
    const selectedProjects = [];

    // Function to create an HTML representation of the project's content
    function createProjectContent(project) {
        const projectElement = document.createElement("div");
        projectElement.classList.add("feed-item");
        projectElement.setAttribute("id", `feed-${project.slug}`);

        // Generate HTML for the project's cover image if it exists
        const coverHtml = project.cover && project.cover.value ? 
            `<img src="${project.cover.value}" alt="${project.title} Cover">` : "";

        // Generate HTML for the blocks by joining them together
        const blocksHtml = project.blocks ? project.blocks.join('') : '';

        projectElement.innerHTML = `
            <button class="toggle-feed-item">Remove</button>
            <h2>${project.title}</h2>
            <div>${blocksHtml}</div>
        `;

        return projectElement;
    }

    // Function to fetch and add the selected project to the feed
    async function fetchAndAddProject(slug) {
        try {
            const response = await fetch(`/projects/${slug}.json`);
            const project = await response.json();

            // Add the slug to the project object for use in the DOM
            project.slug = slug;

            // Check if this project is already selected
            const index = selectedProjects.findIndex(item => item.slug === slug);

            if (index !== -1) {
                // Remove existing project from the list to toggle selection
                selectedProjects.splice(index, 1);
                document.getElementById(`feed-${slug}`).remove();
            } else {
                // Prepend the new project to the list
                selectedProjects.unshift(project);
            }

            // Update the feed to reflect the current order
            updateFeed();
        } catch (error) {
            console.error(`Error fetching project ${slug}:`, error);
        }
    }

    // Update the feed by appending projects in selection order
    function updateFeed() {
        feedContainer.innerHTML = "";
        selectedProjects.forEach((project) => {
            const projectContent = createProjectContent(project);
            feedContainer.appendChild(projectContent);
        });
    }

    // Add event listeners to each index item
    indexItems.forEach(item => {
        item.addEventListener("click", function () {
            const slug = item.id;
            item.classList.toggle("selected");
            fetchAndAddProject(slug);
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
