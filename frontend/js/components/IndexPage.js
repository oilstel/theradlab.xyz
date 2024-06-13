// assets/js/components/IndexPage.js
Vue.component('index-page', {
    data() {
      return {
        filters: ['Article', 'Book', 'Performance'],
        items: []
      };
    },
    template: `
      <div class="overlay">
        <section id="index">
          <button class="close-section" @click="closeOverlay">Close</button>
          <h1>Index</h1>
          <div id="index-inner">
            <div id="search-and-filters">
              <div id="search">
                <span class="descriptor">Search by</span>
                <input type="search" placeholder="anything">
              </div>
              <div id="filters">
                <span class="descriptor">Filter by</span>
                <div class="filter" v-for="filter in filters" :key="filter">
                  <input type="checkbox" :id="filter" name="filters[]" :value="filter">
                  <label :for="filter">{{ filter }}</label>
                </div>
              </div>
            </div>
            <div id="index-items">
              <div class="item" v-for="item in items" :key="item.slug" :id="item.slug">
                <div class="title" @click="viewProject(item.slug)">{{ item.title }}</div>
                <div class="authors">{{ item.authors }}</div>
                <div class="tag-and-date">{{ item.tags }}, {{ item.date }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
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
              tags: project.tags,
              date: project.date,
              slug: project.slug
            }));
          })
          .catch(error => console.error('Error fetching projects:', error));
      },
      viewProject(slug) {
        this.$router.push({ name: 'project', params: { slug } });
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  