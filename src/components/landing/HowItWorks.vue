<style scoped>
  #howitworks {
    position: relative;
    width: 100%;
    padding-top: 5rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  :deep(h1) {
    color: var(--primary-color);
    text-align: center;
  }

  :deep(h2) {
    text-align: center;
  }
</style>

<template>
  <div id="howitworks">
    <div class="content">
      <h1 ref="howitworks_title">{{ content.title }}</h1>
      <h2 ref="howitworks_subtitle">{{ content.subtitle }}</h2>
      <p ref="howitworks_p1">{{ content.p1 }}</p>
      <p ref="howitworks_p2">{{ content.p2 }}</p>
      <p ref="howitworks_p3">{{ content.p3 }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import copy from '@/assets/copy/en/landing/HowItWorks.yml'
import { ref, onMounted } from 'vue'
import { onElementVisible } from '@/lib/IntersectionObserver'

export default {
  name: 'HowItWorks',
  setup() {
    const howitworks_title = ref(null)
    const howitworks_subtitle = ref(null)
    const howitworks_p1 = ref(null)
    const howitworks_p2 = ref(null)
    const howitworks_p3 = ref(null)

    onMounted(() => {
      howitworks_title.value.style.opacity = 0;
      howitworks_subtitle.value.style.opacity = 0;
      howitworks_p1.value.style.opacity = 0;
      howitworks_p2.value.style.opacity = 0;
      howitworks_p3.value.style.opacity = 0;

      onElementVisible(howitworks_title.value, () => howitworks_title.value.classList.add('anim-left'))
      onElementVisible(howitworks_subtitle.value, () => howitworks_subtitle.value.classList.add('anim-right'))
      onElementVisible(howitworks_p1.value, () => howitworks_p1.value.classList.add('anim-left'))
      onElementVisible(howitworks_p2.value, () => howitworks_p2.value.classList.add('anim-right'))
      onElementVisible(howitworks_p3.value, () => howitworks_p3.value.classList.add('anim-left'))
    })

    return {
      content: copy,
      howitworks_title,
      howitworks_subtitle,
      howitworks_p1,
      howitworks_p2,
      howitworks_p3
    }
  }
}
</script>
