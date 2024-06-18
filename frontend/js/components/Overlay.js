// Overlay.js
Vue.component('overlay', {
    props: ['direction', 'visible'],
    data() {
        return {
            activeComponent: null
        };
    },
    computed: {
        overlayClass() {
            return this.activeComponent ? this.activeComponent.replace('-page', '') : '';
        },
        transitionName() {
            return this.overlayClass ? this.overlayClass : 'overlay';
        }
    },
    template: `
      <transition :name="transitionName">
        <div v-if="visible" :class="['overlay', overlayClass]" ref="overlay">
          <component v-if="activeComponent" :is="activeComponent"></component>
        </div>
      </transition>
    `,
    methods: {
        setActiveComponent(component) {
            this.activeComponent = component;
        }
    }
});
