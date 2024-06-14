Vue.component('navigation', {
    template: `
      <nav>
        <a @click.prevent="navigateTo('home')" id="site-title"></a>
        <a @click.prevent="toggleIndex" id="index-btn">Index</a>
        <a @click.prevent="toggleOverlay('about')" id="about-btn">About</a>
        <a @click.prevent="toggleOverlay('contact')" id="contact-btn">Contact</a>
      </nav>
    `,
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      },
      toggleOverlay(overlay) {
        this.$emit('toggle-overlay', overlay);
      },
      toggleIndex() {
        if (this.$route.name !== 'index') {
          this.$router.push({ name: 'index' });
        } else {
          this.$emit('toggle-overlay', null); // Close the overlay if it's open
        }
      }
    }
});
