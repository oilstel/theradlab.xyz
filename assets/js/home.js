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
    const indexHeader = document.querySelectorAll('#index h1')[0];

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
    indexHeader.addEventListener("click", function () {
        toggleSection(indexSection, false);
    });

    // Function to filter and search items
    function filterAndSearchItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedFilters = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());

        for (let item of items) {
            const title = item.querySelector(".title").innerText.toLowerCase();
            const tagsAndDate = item.querySelector(".tag-and-date").innerText.toLowerCase();
            const matchesSearch = title.includes(searchTerm);
            const matchesFilters = selectedFilters.every(filter => tagsAndDate.includes(filter));
            item.style.display = matchesSearch && (selectedFilters.length === 0 || matchesFilters) ? "" : "none";
        }
    }

    searchInput.addEventListener("input", filterAndSearchItems);
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterAndSearchItems);
    });

    function createProjectContent(project) {
        const projectElement = document.createElement("div");
        projectElement.classList.add("feed-item");
        projectElement.setAttribute("id", `feed-${project.slug}`);
        const coverHtml = project.cover && project.cover.value ? 
            `<img src="${project.cover.value}" alt="${project.title} Cover">` : "";
        const layoutsHtml = project.layouts ? project.layouts.join('') : '';
        projectElement.innerHTML = `<h1 class="project-title">${project.title}</h1>${layoutsHtml}`;
        return projectElement;
    }

    async function fetchAndReorderProject(slug) {
        try {
            const index = selectedProjects.findIndex(item => item.slug === slug);
            if (index !== -1) {
                const existingProject = selectedProjects.splice(index, 1)[0];
                selectedProjects.unshift(existingProject);
            } else {
                const response = await fetch(`/projects/${slug}.json`);
                const project = await response.json();
                project.slug = slug;
                selectedProjects.unshift(project);
            }
            updateFeed();
        } catch (error) {
            console.error(`Error fetching project ${slug}:`, error);
        }
    }

    async function fetchAndToggleProject(slug) {
        const index = selectedProjects.findIndex(item => item.slug === slug);
        if (index !== -1) {
            selectedProjects.splice(index, 1);
            document.getElementById(`feed-${slug}`).remove();
        } else {
            await fetchAndReorderProject(slug);
        }
        updateFeed();
    }

    function updateFeed() {
        feedContainer.innerHTML = "";
        selectedProjects.forEach((project) => {
            const projectContent = createProjectContent(project);
            feedContainer.appendChild(projectContent);
        });
    }

    indexItems.forEach(item => {
        item.addEventListener("click", function () {
            const slug = item.id;
            item.classList.toggle("selected");
            fetchAndToggleProject(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    lilypads.forEach(lilypad => {
        lilypad.addEventListener("click", function () {
            const slug = lilypad.id;
            const indexItem = document.getElementById(slug);
            if (indexItem) {
                indexItem.classList.add("selected");
            }
            fetchAndReorderProject(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    feedContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("toggle-feed-item")) {
            const feedItem = event.target.parentElement;
            const slug = feedItem.id.replace("feed-", "");
            feedItem.remove();
            const index = selectedProjects.findIndex(item => item.slug === slug);
            if (index !== -1) {
                selectedProjects.splice(index, 1);
            }
        }
    });

    // Handle direct project link access via ?p=project-slug
    const urlParams = new URLSearchParams(window.location.search);
    const projectSlug = urlParams.get('p');
    if (projectSlug) {
        const indexItem = document.getElementById(projectSlug);
        if (indexItem) {
            indexItem.classList.add("selected");
        }
        fetchAndToggleProject(projectSlug);
    }
});







// Lilypads Parallax
document.addEventListener('DOMContentLoaded', function() {
    const lilypads = document.querySelector('#lilypads');
    const figures = lilypads.querySelectorAll('figure');

    function moveFigures(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX || centerX;
        const mouseY = e.clientY || centerY;

        figures.forEach((figure, index) => {
            const bounds = figure.getBoundingClientRect();
            const figCenterX = bounds.left + bounds.width / 2;
            const figCenterY = bounds.top + bounds.height / 2;
            const deltaX = mouseX - figCenterX;
            const deltaY = mouseY - figCenterY;
            const parallaxX = deltaX * (index + 1) * 0.02; // Increasing multiplier for X axis
            const parallaxY = deltaY * (index + 1) * 0.02; // Increasing multiplier for Y axis
            figure.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
        });
    }

    // Listen to mouse move event
    document.addEventListener('mousemove', moveFigures);
});


