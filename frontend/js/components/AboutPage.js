Vue.component('about-page', {
    data() {
      return {
        intro: '',
        quickLinks: '',
        layouts: []
      };
    },
    template: `
      <transition name="overlay" appear>
        <div class="overlay about">
          <section id="about">
            <h1>About</h1>
            <div v-html="intro"></div>
            <div v-html="quickLinks"></div>
            <div v-html="layouts.join('')"></div>
          </section>
        </div>
      </transition>
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
  