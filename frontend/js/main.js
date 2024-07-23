// main.js

Vue.config.devtools = true;
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Vue.component('home-page'), name: 'home' },
    { path: '/index', component: Vue.component('index-page'), name: 'index' },
    { path: '/about', component: Vue.component('about-page'), name: 'about' },
    { path: '/contact', component: Vue.component('contact-page'), name: 'contact' },
    { path: '/entries/:slug', component: Vue.component('project-page'), name: 'project' }
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
        visitedProjects: [],
        overlayDirection: '',
        overlayVisible: false // New state to track visibility
    },
    watch: {
        $route(to) {
            this.showHomePage = to.path === '/';
            this.checkAndSetBodyOverflow(to);
            if (this.$refs.overlay) {
                if (this.showHomePage) {
                    this.$refs.overlay.setActiveComponent(null); // Hide overlay on homepage
                } else {
                    this.$refs.overlay.setActiveComponent(to.name + '-page'); // Show the correct overlay
                }
            }
        }
    },
    methods: {
        toggleOverlay(overlay) {
            if (this.activeOverlay === overlay) {
                this.overlayVisible = false; // Hide overlay with animation
                this.activeOverlay = null;
                this.showHomePage = true;
                document.body.style.overflow = '';
                this.$router.push({ name: 'home' });
                document.title = 'Rad Lab';
            } else {
                this.overlayVisible = true; // Show overlay with animation
                this.activeOverlay = overlay;
                this.showHomePage = false;
                document.body.style.overflow = 'hidden';
                if (this.$refs.overlay) {
                    this.$refs.overlay.setActiveComponent(overlay + '-page');
                }
                this.$router.push({ name: overlay });
            }
        },
        checkAndSetBodyOverflow(route) {
            const overlays = ['about', 'contact', 'index', 'project'];
            if (overlays.includes(route.name)) {
                this.activeOverlay = route.name;
                this.overlayVisible = true; // Show overlay
                document.body.style.overflow = 'hidden';
                if (this.$refs.overlay) {
                    this.$refs.overlay.setActiveComponent(route.name + '-page');
                }
            } else {
                this.activeOverlay = null;
                this.overlayVisible = false; // Hide overlay
                document.body.style.overflow = '';
            }
        },
        markProjectAsVisited(slug) {
            if (!this.visitedProjects.includes(slug)) {
                this.visitedProjects.push(slug);
            }
        }
    },
    created() {
        this.showHomePage = this.$route.path === '/';
        this.checkAndSetBodyOverflow(this.$route);
    },
    mounted() {
        if (this.$refs.overlay && this.activeOverlay) {
            this.$refs.overlay.setActiveComponent(this.activeOverlay + '-page');
        }
    }
});
