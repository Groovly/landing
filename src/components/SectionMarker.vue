<template>
  <h2
    class="section-title"
    ref="title"
    :style="`color: ${color}`"
  >
    {{ name }}
  </h2>
  <div
    ref="separator"
    class="section-separator"
    :style="`border-color: ${color}`"
  />
</template>

<style scoped>
.section-title {
  writing-mode: vertical-rl;
  text-orientation: sideways;
  margin-top: .2rem;
  transform: translateY(-0.2rem);
}
.section-separator {
  border-left: .15rem solid;
  padding-right: 1rem;
  margin-left: .3rem;

  /* animate transform */
  transition: transform 1s ease-out;
  transform-origin: top;

  /* start fully collapsed */
  transform: scaleY(0);
}

.expand-vertical {
  transform: scaleY(1);
}
</style>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'SectionMarker',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    threshold: {
      type: Number,
      required: false,
      default: 0.5
    },
    color: {
      type: String,
      required: false,
      default: 'black'
    }
  },
  setup(props) {
    const title = ref(null)
    const separator = ref(null)

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        separator.value.classList.add('expand-vertical')
      } else {
        separator.value.classList.remove('expand-vertical')
      }
    }
    const observer = new IntersectionObserver(onIntersection, { root: null, threshold: props.threshold })

    onMounted(() => {
      // observe intersection of title element! (instead of
      // separator element which starts collaped, i.e. y-scale = 0)
      observer.observe(title.value)
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    return {
      separator,
      title,
      observer
    }
  }
}
</script>
