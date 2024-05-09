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


    // Close buttons
    const closeButtons = document.querySelectorAll(".close-section");

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const section = button.closest("section");
            if (section) {
                section.style.display = "none";
            }
        });
    });


    // Navigation
    const sections = {
        "about-btn": "about",
        "contact-btn": "contact",
        "site-title": "index" // Or whatever the primary section should be called
    };

    // Function to show a specific section and hide others
    function showSection(sectionId) {
        for (const key in sections) {
            const section = document.getElementById(sections[key]);
            section.style.display = section.id === sectionId ? "block" : "none";
        }
    }

    // Add event listeners to the navigation links
    for (const navButtonId in sections) {
        const navButton = document.getElementById(navButtonId);
        const sectionId = sections[navButtonId];

        if (navButton) {
            navButton.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default link behavior
                showSection(sectionId); // Show the selected section
            });
        }
    }

    // Initially show the primary section and hide the others
    showSection("index");
});