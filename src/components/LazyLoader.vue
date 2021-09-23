<template>
  <template
    v-if="!loaded"
  >
    <div ref="placeholder" class="placeholder"></div>
  </template>
  <template
    v-else
  >
    <slot />
  </template>
</template>

<style scoped>
.placeholder {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  export default {
    name: 'LazyLoader',
    props: {
      threshold: {
        type: Number,
        required: false,
        default: 0.1
      },
      intersectionOffset: {
        type: String,
        required: false,
        default: '50px'
      }
    },
    setup(props) {
      const placeholder = ref(null)
      let observer : IntersectionObserver
      let loaded = ref(false)

      const onIntersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          loaded.value = true
          observer.disconnect()
        }
      }
      observer = new IntersectionObserver(onIntersection, {
        root: null,
        threshold: props.threshold,
        rootMargin: props.intersectionOffset
      })

      onMounted(() => {
        observer.observe(placeholder.value)
      })

      onBeforeUnmount(() => {
        observer.disconnect()
      })

      return {
        placeholder,
        observer,
        loaded
      }
    }
  }
  </script>
