Vue.component('contact-page', {
    data() {
      return {
        layouts: []
      };
    },
    template: `
      <transition name="overlay" appear>
        <div class="overlay contact">
            <section>
                <article id="contact" class="page-content">
                    <div v-html="layouts.join('')"></div>
                </article>
            </section>
        </div>
      </transition>
    `,
    created() {
      this.fetchContact();
    },
    methods: {
      fetchContact() {
        fetch(`${window.apiUrl}contact`)
          .then(response => response.json())
          .then(data => {
            this.layouts = data.layouts;
          })
          .catch(error => console.error('Error fetching contact content:', error));
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  