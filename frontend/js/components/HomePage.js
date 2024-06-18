Vue.component('home-page', {
    data() {
        return {
            pageTitle: 'RAD Lab',
            layouts: []
        };
    },
    template: `
      <section id="home">
        <div id="lilypads">
            <div v-for="layout in layouts" 
                 :class="['layout', layout.width]" 
                 :key="layout.width">
              <div v-for="block in layout.blocks" 
                   :key="block.block[0].slug" 
                   :class="['block', block.block[0].alignment, block.block[0].size]">
                <figure v-for="lilypad in block.block" 
                        :key="lilypad.slug" 
                        :id="lilypad.slug" 
                        @click="viewProject(lilypad.slug)" 
                        :class="{'text-lilypad': lilypad.type === 'text', 'image-lilypad': lilypad.type === 'image'}">
                  <template v-if="lilypad.type === 'text'">
                    <h2>{{ lilypad.title }}</h2>
                    <div v-if="lilypad.textSubtitle" class="subtitle">{{ lilypad.textSubtitle }}</div>
                  </template>
                  <img v-else-if="lilypad.type === 'image'" :src="lilypad.image" :alt="lilypad.title">
                </figure>
              </div>
            </div>
        </div>
      </section>
    `,
    created() {
        this.fetchProjects();
    },
    methods: {
        fetchProjects() {
            fetch(`${window.apiUrl}home`)
                .then(response => response.json())
                .then(data => {
                    this.layouts = data.layouts;
                    this.pageTitle = data.title || 'RAD Lab';
                    document.title = this.pageTitle;  // Set document title
                })
                .catch(error => console.error('Error fetching projects:', error));
        },
        viewProject(slug) {
            this.$router.push({ name: 'project', params: { slug } });
        }
    }
});
