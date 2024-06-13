// assets/js/components/Navigation.js
Vue.component('navigation', {
    template: `
      <nav>
        <a @click.prevent="navigateTo('home')" id="site-title"></a>
        <a @click.prevent="navigateTo('index')" id="index-btn">Index</a>
        <a @click.prevent="navigateTo('about')" id="about-btn">About</a>
        <a @click.prevent="navigateTo('contact')" id="contact-btn">Contact</a>
      </nav>
    `,
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      }
    }
  });
  