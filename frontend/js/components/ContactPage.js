// ContactPage.js
Vue.component('contact-page', {
    data() {
        return {
            pageTitle: 'Contact – Rad Lab',
            layouts: []
        };
    },
    template: `
      <section>
        <article id="contact" class="page-content">
          <div v-html="layouts.join('')"></div>
        </article>
      </section>
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
                    document.title = this.pageTitle;
                })
                .catch(error => console.error('Error fetching contact content:', error));
        }
    }
});
