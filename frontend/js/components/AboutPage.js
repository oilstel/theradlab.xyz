Vue.component('about-page', {
    data() {
      return {
        pageTitle: 'About – Rad Lab',
        intro: '',
        quickLinks: '',
        layouts: []
      };
    },
    template: `
      <transition name="overlay" appear>
        <div class="overlay about">
            <section>
                <article id="about" class="page-content">
                    <div v-html="intro" id="intro"></div>
                    <div v-html="quickLinks" id="quick-links"></div>
                    <div v-html="layouts.join('')"></div>
                </article>
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
            document.title = this.pageTitle;
          })
          .catch(error => console.error('Error fetching about content:', error));
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  