// assets/js/components/HomePage.js
Vue.component('home-page', {
    data() {
        return {
            lilypads: []
        };
    },
    template: `
      <section id="home">
        <div id="lilypads">
          <figure v-for="lilypad in lilypads" :key="lilypad.slug" :id="lilypad.slug" @click="viewProject(lilypad.slug)">
            <img v-if="lilypad.image" :src="lilypad.image" :alt="lilypad.title">
          </figure>
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
                        slug: lilypad.slug
                    }));
                })
                .catch(error => console.error('Error fetching projects:', error));
        },
        viewProject(slug) {
            this.$router.push({ name: 'project', params: { slug } });
        }
    }
});
