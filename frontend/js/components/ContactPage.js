// assets/js/components/ContactPage.js
Vue.component('contact-page', {
    data() {
      return {
        contactInfo: ''
      };
    },
    template: `
      <div class="overlay">
        <section id="contact">
          <!-- <button class="close-section" @click="closeOverlay">Close</button> -->
          <article>
            {{ contactInfo }}
            contact
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
  