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
                   :key="block.block[0]?.slug || 'empty'" 
                   :class="['block', block.block[0]?.alignment, block.block[0]?.size, { empty: block.block[0]?.empty }]">
                <figure v-for="lilypad in block.block" 
                        :key="lilypad.slug || 'empty'" 
                        :id="lilypad.slug || 'empty'" 
                        @click="viewProject(lilypad.slug)" 
                        :class="{'text-lilypad': lilypad.type === 'text', 'image-lilypad': lilypad.type === 'image'}">
                  <template v-if="lilypad.type === 'text' && !lilypad.empty">
                    <h2>{{ lilypad.title }}</h2>
                    <div v-if="lilypad.textSubtitle" class="subtitle">{{ lilypad.textSubtitle }}</div>
                  </template>
                  <img v-else-if="lilypad.type === 'image' && !lilypad.empty" :src="lilypad.image" :alt="lilypad.title">
                  <div v-else-if="lilypad.empty" class="empty-block"></div>
                </figure>
              </div>
            </div>
        </div>
      </section>
    `,
    created() {
        this.fetchProjects();
        document.title = this.pageTitle;
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
            if (slug) {
                this.$router.push({ name: 'project', params: { slug } });
            }
        }
    }
});
