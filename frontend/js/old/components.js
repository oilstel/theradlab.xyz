// assets/js/components.js

Vue.component('navigation', {
    template: `
      <nav>
        <a @click.prevent="navigateTo('home')">Home</a>
        <a @click.prevent="navigateTo('index')">Index</a>
        <a @click.prevent="navigateTo('about')">About</a>
        <a @click.prevent="navigateTo('contact')">Contact</a>
      </nav>
    `,
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      }
    }
  });
  
  Vue.component('home-page', {
    data() {
      return {
        projects: []
      };
    },
    template: `
      <section id="home">
        <h1>Home Page</h1>
        <div id="projects">
          <div v-for="project in projects" :key="project.id" class="project">
            <h2 @click="viewProject(project.id)">{{ project.title }}</h2>
            <p>{{ project.authors.join(', ') }}</p>
            <p>{{ project.tags.join(', ') }}, {{ project.date }}</p>
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
            this.projects = data.projects.map(project => ({
              id: project.id,
              title: project.title,
              authors: project.authors.split(', '),
              tags: project.tags.split(', '),
              date: project.date
            }));
          })
          .catch(error => console.error('Error fetching projects:', error));
      },
      viewProject(id) {
        this.$router.push({ name: 'project', params: { id } });
      }
    }
  });
  
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
  
  Vue.component('about-page', {
    data() {
      return {
        intro: '',
        quickLinks: '',
        layouts: []
      };
    },
    template: `
      <div class="overlay">
        <section id="about">
          <button class="close-section" @click="closeOverlay">Close</button>
          <article class="page-content">
            <div id="intro" v-html="intro"></div>
            <div id="quick-links" v-html="quickLinks"></div>
            <div v-for="layout in layouts" :key="layout.id" v-html="layout"></div>
          </article>
        </section>
      </div>
    `,
    created() {
      this.fetchAbout();
    },
    methods: {
      fetchAbout() {
        fetch(`${window.apiUrl}about`)
          .then(response => response.json())
          .then(data => {
            this.intro = data.intro;
            this.quickLinks = data.quickLinks;
            this.layouts = data.layouts;
          })
          .catch(error => console.error('Error fetching about content:', error));
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  
  Vue.component('contact-page', {
    data() {
      return {
        contactInfo: ''
      };
    },
    template: `
      <div class="overlay">
        <section id="contact">
          <button class="close-section" @click="closeOverlay">Close</button>
          <article>
            {{ contactInfo }}
          </article>
        </section>
      </div>
    `,
    created() {
      this.fetchContact();
    },
    methods: {
      fetchContact() {
        fetch(`${window.apiUrl}contact`)
          .then(response => response.json())
          .then(data => {
            this.contactInfo = data.contactInfo;
          })
          .catch(error => console.error('Error fetching contact content:', error));
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  
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
            <div v-html="project.layouts"></div>
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
  
  