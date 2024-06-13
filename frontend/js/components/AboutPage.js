// assets/js/components/AboutPage.js
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
  