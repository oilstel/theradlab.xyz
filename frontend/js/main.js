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
    router,
    data: {
        activeOverlay: null,
        showHomePage: true,
        visitedProjects: []
    },
    watch: {
        $route(to) {
            this.showHomePage = to.path === '/';
            this.checkAndSetBodyOverflow(to);
        }
    },
    methods: {
        toggleOverlay(overlay) {
            console.log('toggleOverlay called with:', overlay); // Debug log
            if (this.activeOverlay === overlay) {
                this.activeOverlay = null;
                this.showHomePage = true;
                document.body.style.overflow = ''; // Remove overflow hidden
                this.$router.push({ name: 'home' });
            } else {
                this.activeOverlay = overlay;
                this.showHomePage = false;
                document.body.style.overflow = 'hidden'; // Add overflow hidden
                this.$router.push({ name: overlay });
            }
            console.log('Document body overflow:', document.body.style.overflow); // Debug log
        },
        checkAndSetBodyOverflow(route) {
            const overlays = ['about', 'contact', 'index', 'project'];
            if (overlays.includes(route.name)) {
                this.activeOverlay = route.name;
                document.body.style.overflow = 'hidden'; // Add overflow hidden
            } else {
                this.activeOverlay = null;
                document.body.style.overflow = ''; // Remove overflow hidden
            }
        }
    },
    created() {
        this.showHomePage = this.$route.path === '/';
        this.checkAndSetBodyOverflow(this.$route); // Check and set overflow when page loads
    }
});
