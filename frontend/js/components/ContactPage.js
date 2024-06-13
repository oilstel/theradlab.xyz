Vue.component('contact-page', {
    data() {
      return {
        contactInfo: ''
      };
    },
    template: `
      <transition name="overlay" appear>
        <div class="overlay contact">
          <section id="contact">
            <h1>Contact</h1>
            <div v-html="contactInfo"></div>
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
            this.contactInfo = data.contactInfo;
          })
          .catch(error => console.error('Error fetching contact content:', error));
      },
      closeOverlay() {
        this.$router.push({ name: 'home' });
      }
    }
  });
  