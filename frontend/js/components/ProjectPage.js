// assets/js/components/ProjectPage.js
Vue.component('project-page', {
    data() {
      return {
        project: null,
        projects: [],
        currentIndex: 0,
        loading: true
      };
    },
    template: `
      <div class="overlay">
        <section id="project">
          <article v-if="project" class="page-content">
            <h1 class="project-title">{{ project.title }}</h1>
            <div v-for="layout in project.layouts" v-html="layout"></div>
            <div class="pagination">
              <button id="prev" @click="goToPrevious" :disabled="currentIndex === 0">Previous</button>
              <button id="next" @click="goToNext" :disabled="currentIndex === projects.length - 1">Next</button>
            </div>
          </article>
        </section>
      </div>
    `,
    created() {
      this.fetchProjects();
    },
    methods: {
      fetchProjects() {
        fetch(`${window.apiUrl}projects`)
          .then(response => response.json())
          .then(data => {
            this.projects = data.projects;
            this.setCurrentProject();
          })
          .catch(error => console.error('Error fetching projects:', error));
      },
      setCurrentProject() {
        const slug = this.$route.params.slug;
        this.currentIndex = this.projects.findIndex(project => project.slug === slug);
        if (this.currentIndex !== -1) {
          this.fetchProject(slug);
        } else {
          this.project = null;
          this.loading = false;
        }
      },
      fetchProject(slug) {
        fetch(`${window.apiUrl}projects/${slug}`)
          .then(response => response.json())
          .then(data => {
            this.project = {
              title: data.title,
              layouts: data.layouts
            };
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching project content:', error);
            this.loading = false;
          });
      },
      goToPrevious() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          const previousSlug = this.projects[this.currentIndex].slug;
          this.fetchProject(previousSlug);
          this.$router.push({ name: 'project', params: { slug: previousSlug } });
        }
      },
      goToNext() {
        if (this.currentIndex < this.projects.length - 1) {
          this.currentIndex++;
          const nextSlug = this.projects[this.currentIndex].slug;
          this.fetchProject(nextSlug);
          this.$router.push({ name: 'project', params: { slug: nextSlug } });
        }
      }
    },
    watch: {
      '$route.params.slug'() {
        this.setCurrentProject();
      }
    }
  });
  