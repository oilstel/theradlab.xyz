// assets/js/main.js

Vue.config.devtools = true;
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Vue.component('home-page'), name: 'home' },
    { path: '/index', component: Vue.component('index-page'), name: 'index' },
    { path: '/about', component: Vue.component('about-page'), name: 'about' },
    { path: '/contact', component: Vue.component('contact-page'), name: 'contact' },
    { path: '/projects/:slug', component: Vue.component('project-page'), name: 'project' }
  ];
  
  const router = new VueRouter({
    mode: 'history',
    routes
  });
  
  new Vue({
    el: '#app',
    router
  });
  