<template>
  <div>
    <div id="img1" class="background visible zoom" />
    <div id="img2" class="background hidden" />
    <div class="overlay" />
  </div>
</template>

<script lang="ts">
// List of images to cycle through
// Each array element is an object with a mandatory 'src' attribute and an
// optional 'align' attribute which controls the image's 'background-align' CSS property.
// If the align property is unspecified the implementation will default to 'background-align: center'
// The base path is hard-coded to the project's asset directory.
// TODO: make into a prop
const images = [
  {
    src: 'images/guitarist.jpg',
    align: 'right'
  },
  {
    src: 'images/singer.jpg',
    align: 'top right'
  },
  {
    src: 'images/dj.jpg',
    align: 'right'
  },
  {
    src: 'images/board.jpg'
  },
  {
    src: 'images/daw.jpg'
  }
];

export default {
  name: 'Slideshow',
  data() {
    return {
      slideshowTransitionTimeoutMs: 4000,
      timerId: null,
      currentImageIdx: 0,
      visibleElementId: 'img1',
      hiddenElementId: 'img2',
      disableTransitions: false
    };
  },
  mounted() {
    // initialize slideshow
    this.initialize();

    // trigger transition animation timer
    if (!this.disableTransitions) {
      this.timerId = window.setInterval(
        this.doTransition,
        this.slideshowTransitionTimeoutMs
      );
    }
  },
  beforeDestroy() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  },
  methods: {
    // sets the slideshow's initial state
    initialize() {
      const img = require('@/assets/' +
        images[this.currentImageIdx].src);

      const visible = document.getElementById(this.visibleElementId);

      if (visible) {
        visible.style.backgroundImage = "url('" + img + "')";
        visible.style.backgroundPosition = this.extractAlignment(
          images[this.currentImageIdx]
        );
      }
    },
    extractAlignment(imageObject) {
      let alignment = imageObject.align;
      if (alignment === undefined) {
        alignment = 'center';
      }
      return alignment;
    },
    // executes slide transition
    doTransition() {
      ++this.currentImageIdx;
      if (this.currentImageIdx === images.length) {
        this.currentImageIdx = 0;
      }

      const img = require('@/assets/' + images[this.currentImageIdx].src);

      // set next image
      const hidden = document.getElementById(this.hiddenElementId);
      if (hidden) {
        hidden.style.backgroundImage = "url('" + img + "')";
        hidden.style.backgroundPosition = this.extractAlignment(
          images[this.currentImageIdx]
        );
        hidden.classList.remove('hidden');
        hidden.classList.add('visible');
        hidden.classList.add('zoom');
      }

      // make hidden visible and viceversa
      const visible = document.getElementById(this.visibleElementId);
      if (visible) {
        visible.classList.remove('visible');
        visible.classList.remove('zoom');
        visible.classList.add('hidden');
      }

      // swap buffers
      [this.visibleElementId, this.hiddenElementId] = [
        this.hiddenElementId,
        this.visibleElementId
      ];
    }
  }
};
</script>

<style scoped>
.background {
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  transform: scale(1.1, 1.1);
  width: 100%;
  height: 100%;
}

.visible {
  z-index: 0;
  opacity: 1;
  animation-name: show;
  animation-duration: 1s;
}

.hidden {
  z-index: 1;
  opacity: 0;
  animation-name: hide;
  animation-duration: 1s;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.zoom {
  animation-name: grow;
  animation-timing-function: linear;
  animation-duration: 4s;
}

@keyframes grow {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(1.1, 1.1);
  }
}

/* background's dot matrix overlay effect */
.overlay {
  position: absolute;
  background-image: url('~assets/images/dot-matrix.png');
  background-position: top left;
  background-repeat: repeat;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
