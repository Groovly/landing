<style scoped>
  #about {
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding-top: 5rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    background-position: bottom center;
    background-image: url('@/assets/images/audience.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  :deep(h1), :deep(h2) {
    text-align: center;
  }
</style>

<template>
  <div id="about">
    <div class="content">
      <h1 ref="about_title">{{ content.title }}</h1>
      <h2 ref="about_subtitle">{{ content.subtitle }}</h2>
      <p ref="about_p1">{{ content.p1 }}</p>
      <p ref="about_p2">{{ content.p2 }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import copy from '@/assets/copy/en/landing/About.yml'
import { ref, onMounted } from 'vue'
import { onElementVisible } from '@/lib/IntersectionObserver'

export default {
  name: 'About',
  setup() {
    const about_title = ref(null)
    const about_subtitle = ref(null)
    const about_p1 = ref(null)
    const about_p2 = ref(null)

    onMounted(() => {
      about_title.value.style.opacity = 0;
      about_subtitle.value.style.opacity = 0;
      about_p1.value.style.opacity = 0;
      about_p2.value.style.opacity = 0;

      onElementVisible(about_title.value, () => about_title.value.classList.add('anim-left'))
      onElementVisible(about_subtitle.value, () => about_subtitle.value.classList.add('anim-right'))
      onElementVisible(about_p1.value, () => about_p1.value.classList.add('anim-left'))
      onElementVisible(about_p2.value, () => about_p2.value.classList.add('anim-right'))
    })

    return {
      content: copy,
      about_title,
      about_subtitle,
      about_p1,
      about_p2
    }
  }
}
</script>
