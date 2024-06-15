Vue.component('home-page', {
    data() {
        return {
            pageTitle: 'Rad Lab',
            lilypads: []
        };
    },
    template: `
      <section id="home">
        <div id="lilypads">
          <figure v-for="lilypad in lilypads" 
                  :key="lilypad.slug" 
                  :id="lilypad.slug" 
                  @click="viewProject(lilypad.slug)" 
                  :class="{'text-lilypad': lilypad.text_lilypad, 'image-lilypad': !lilypad.text_lilypad}">
            <template v-if="lilypad.text_lilypad">
              <h2>{{ lilypad.title }}</h2>
              <div v-if="lilypad.subtitle" class="subtitle">{{ lilypad.subtitle }}</div>
            </template>
            <img v-else-if="lilypad.image" :src="lilypad.image" :alt="lilypad.title">
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
                        slug: lilypad.slug,
                        text_lilypad: lilypad.text_lilypad,
                        subtitle: lilypad.subtitle
                    }));
                    this.pageTitle = data.title || 'Rad Lab';
                    document.title = this.pageTitle;  // Set document title
                })
                .catch(error => console.error('Error fetching projects:', error));
        },
        viewProject(slug) {
            this.$router.push({ name: 'project', params: { slug } });
        }
    }
});


