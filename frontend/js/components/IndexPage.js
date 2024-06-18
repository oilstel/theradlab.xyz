// IndexPage.js
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
                <label :for="filter">{{ filter }}</label>
              </div>
            </div>
          </div>
          <div id="index-items">
            <div class="item" 
                 v-for="item in filteredItems" 
                 :key="item.slug" 
                 :id="item.slug"
                 :class="{ visited: visitedProjects.includes(item.slug) }"
                 @click="viewProject(item.slug)">
              <div class="title">{{ item.title }}</div>
              <div class="authors">{{ item.authors }}</div>
              <div class="tag-and-date">{{ item.tags.join(', ') }}, {{ item.date }}</div>
            </div>
          </div>
        </div>
      </section>
    `,
    computed: {
        filteredItems() {
            let filteredByTags = this.items;
            if (this.activeFilters.length > 0) {
                filteredByTags = this.items.filter(item => {
                    return this.activeFilters.some(filter => item.tags.includes(filter));
                });
            }
            if (this.searchQuery) {
                return filteredByTags.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            return filteredByTags;
        }
    },
    created() {
        this.fetchItems();
    },
    methods: {
        fetchItems() {
            fetch(`${window.apiUrl}projects`)
                .then(response => response.json())
                .then(data => {
                    this.items = data.projects.map(project => ({
                        title: project.title,
                        authors: project.authors,
                        tags: project.tags.split(', '),
                        date: project.date,
                        slug: project.slug
                    }));
                    this.filters = [...new Set(this.items.flatMap(item => item.tags))];
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
        }
    }
});
