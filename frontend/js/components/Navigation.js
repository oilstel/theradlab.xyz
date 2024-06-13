// assets/js/components/Navigation.js
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
  