// assets/js/components/HomePage.js
Vue.component('home-page', {
    data() {
      return {
        lilypads: []
      };
    },
    template: `
      <section id="home">
        <h1>Home Page</h1>
        <div id="lilypads">
          <div v-for="lilypad in lilypads" :key="lilypad.title" class="lilypad">
            <h2>{{ lilypad.title }}</h2>
            <p>{{ lilypad.authors }}</p>
            <p>{{ lilypad.tags }}, {{ lilypad.date }}</p>
            <img :src="lilypad.image" :alt="lilypad.title">
            <a :href="lilypad.url" @click.prevent="viewProject(lilypad.slug)">View Project</a>
          </div>
        </div>
      </section>
    `,
    created() {
      this.fetchProjects();
    },
    methods: {
      fetchProjects() {
        fetch(`${window.apiUrl}home`)
          .then(response => response.json())
          .then(data => {
            this.lilypads = data.lilypads.map(lilypad => ({
              title: lilypad.title,
              authors: lilypad.authors,
              tags: lilypad.tags,
              date: lilypad.date,
              image: lilypad.image,
              url: lilypad.url,
              slug: lilypad.url.split('/').pop()
            }));
          })
          .catch(error => console.error('Error fetching projects:', error));
      },
      viewProject(slug) {
        this.$router.push({ name: 'project', params: { slug } });
      }
    }
  });
  