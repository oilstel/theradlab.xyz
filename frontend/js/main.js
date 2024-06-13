// assets/js/main.js

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
    router,
    data: {
        activeOverlay: null,
        showHomePage: true
    },
    watch: {
        $route(to) {
            this.showHomePage = to.path === '/';
        }
    },
    methods: {
        toggleOverlay(overlay) {
            if (this.activeOverlay === overlay) {
                this.activeOverlay = null;
                this.showHomePage = true;
                this.$router.push({ name: 'home' });
            } else {
                this.activeOverlay = overlay;
                this.showHomePage = false;
                this.$router.push({ name: overlay });
            }
        }
    },
    created() {
        this.showHomePage = this.$route.path === '/';
    }
});
