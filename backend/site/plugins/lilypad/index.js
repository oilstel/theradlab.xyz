panel.plugin('yourname/lilypad', {
    blocks: {
      lilypad: {
        computed: {
          project() {
            return this.content.selectedproject && this.content.selectedproject.length > 0 ? this.content.selectedproject[0] : {};
          },
          projectImage() {
            console.log(this.project);
            return this.project.image ? this.project.image.url : '';
          },
          projectTitle() {
            return this.project.text || '';
          },
          blockClasses() {
            return [
              'lilypad-block',
              'lilypad-block-' + this.content.alignment,
              'lilypad-block-' + (this.content.size || 'medium'),
              this.content.displayastextlilypad ? 'lilypad-block-text' : ''
            ];
          }
        },
        template: `
          <div :class="blockClasses">
            <img v-if="projectImage && !content.displayastextlilypad" :src="projectImage" :alt="projectTitle" />
            <h2 v-if="content.displayastextlilypad">{{ projectTitle }}</h2>
            <p v-if="content.displayastextlilypad">{{ content.lilypadsubtitle }}</p>
          </div>
        `
      }
    }
  });
  