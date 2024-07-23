Vue.component('index-page', {
    data() {
        return {
            pageTitle: 'Index – Rad Lab',
            searchQuery: '',
            filters: [],
            items: [],
            activeFilters: [],
            visitedProjects: this.$root.visitedProjects || [] // Initialize from root
        };
    },
    template: `
      <section id="index">
        <div id="index-inner">
          <div id="search-and-filters">
            <div id="search">
              <span class="descriptor">Search by</span>
              <input type="search" v-model="searchQuery" placeholder="anything">
            </div>
            <div id="filters">
              <span class="descriptor">Filter by</span>
              <div class="filter" v-for="filter in filters" :key="filter">
                <input type="checkbox" :id="filter" name="filters[]" :value="filter" @change="toggleFilter(filter)">
                <label :for="filter">{{ capitalize(filter) }}</label>
              </div>
            </div>
          </div>
          <div id="index-items">
            <div class="item" 
                 v-for="item in sortedAndFilteredItems" 
                 :key="item.slug" 
                 :id="item.slug"
                 :class="{ visited: visitedProjects.includes(item.slug) }"
                 @click="viewProject(item.slug)">
              <div class="title">{{ item.title }}</div>
              <div class="authors">{{ item.authors }}</div>
              <div class="type-and-date">
                {{ item.type }}<span v-if="item.type && hasDate(item.startDate, item.endDate)">,</span> {{ formatDates(item.startDate, item.endDate) }}
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    computed: {
        sortedAndFilteredItems() {
            return this.filteredItems.sort((a, b) => a.title.localeCompare(b.title));
        },
        filteredItems() {
            let filteredByType = this.items;
            if (this.activeFilters.length > 0) {
                filteredByType = this.items.filter(item => {
                    return this.activeFilters.includes(item.type) || (item.tags && item.tags.some(tag => this.activeFilters.includes(tag)));
                });
            }
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                return filteredByType.filter(item => {
                    const itemData = [
                        item.title.toLowerCase(),
                        item.authors.toLowerCase(),
                        item.type ? item.type.toLowerCase() : '',
                        item.tags ? item.tags.join(' ').toLowerCase() : '', // Include tags in the search
                        item.startDate ? item.startDate.toLowerCase() : '',
                        item.endDate ? item.endDate.toLowerCase() : ''
                    ];
                    return itemData.some(data => data.includes(query));
                });
            }
            return filteredByType;
        }
    },
    created() {
        this.fetchItems();
    },
    methods: {
        fetchItems() {
            fetch(`${window.apiUrl}entries`)
                .then(response => response.json())
                .then(data => {
                    this.items = data.projects.map(project => ({
                        title: project.title,
                        authors: project.authors,
                        type: project.type || '', // Handle empty type
                        tags: project.tags || [], // Handle empty tags
                        startDate: project.startDate,
                        endDate: project.endDate,
                        slug: project.slug
                    }));

                    // Add both types and tags to filters
                    const types = new Set(this.items.map(item => item.type).filter(type => type));
                    const tags = new Set(this.items.flatMap(item => item.tags));
                    this.filters = [...types, ...tags];

                    document.title = this.pageTitle;
                })
                .catch(error => console.error('Error fetching projects:', error));
        },
        viewProject(slug) {
            this.markProjectAsVisited(slug);
            this.$router.push({ name: 'project', params: { slug } });
        },
        toggleFilter(filter) {
            if (this.activeFilters.includes(filter)) {
                this.activeFilters = this.activeFilters.filter(f => f !== filter);
            } else {
                this.activeFilters.push(filter);
            }
        },
        markProjectAsVisited(slug) {
            if (!this.visitedProjects.includes(slug)) {
                this.visitedProjects.push(slug);
            }
            this.$root.visitedProjects = this.visitedProjects; // Sync with root
        },
        capitalize(word) {
            if (!word) return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        formatDates(startDate, endDate) {
            if (startDate && endDate) {
                return `${startDate} – ${endDate}`;
            } else if (startDate) {
                return startDate;
            } else if (endDate) {
                return endDate;
            } else {
                return '';
            }
        },
        hasDate(startDate, endDate) {
            return startDate || endDate;
        }
    }
});
