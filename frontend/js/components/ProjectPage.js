// assets/js/components/ProjectPage.js
Vue.component('project-page', {
    data() {
      return {
        project: null
      };
    },
    template: `
      <div class="overlay">
        <section id="project">
          <button class="close-section" @click="closeOverlay">Close</button>
          <article v-if="project">
            <h1>{{ project.title }}</h1>
            <div v-for="layout in project.layouts" v-html="layout"></div>
          </article>
        </section>
      </div>
    `,
    created() {
      this.fetchProject();
    },
    methods: {
      fetchProject() {
        const projectSlug = this.$route.params.slug;
        fetch(`${window.apiUrl}projects/${projectSlug}`)
          .then(response => response.json())
          .then(data => {
            this.project = {
              title: data.title,
              layouts: data.layouts
            };
          })
          .catch(error => console.error('Error fetching project content:', error));
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  