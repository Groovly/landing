<style scoped>
  #hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    min-height: 100vh;

    padding-top: 8rem;
    padding-bottom: 5rem;
    background-color: #555;
  }

  .hero-video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .video-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.4;
  }

  .video-overlay-texture {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('@/assets/images/dot-matrix.png');
    opacity: 0.2;
  }

  .hero-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .cta-container {
    display: flex;
    flex-direction: column;
    max-width: 30rem;
  }

  .slider {
    width: 100%;
    overflow: hidden;
    padding: 0 var(--content-margin);
  }

  .slides {
    display: flex;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }

  .slides > div {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;

    display: flex;
    justify-content: center;
    font-size: 100px;
  }
</style>

<template>
  <div id="hero">
    <video
      class="hero-video"
      loop
      muted
      playsinline
      autoplay
      preload="auto"
      poster="@/assets/images/hero_poster.jpg"
    >
      <source type="video/mp4" src="@/assets/video/hero_700kbps.mp4" />
      Your browser doesn't seem to support video playback. =(
    </video>

    <div class="video-overlay" />
    <div class="video-overlay-texture" />

    <div class="slider">
      <div id="slides" class="slides">
        <div
          class="hero-header"
          v-for="(header, i) in content.headers"
          :key="header"
          :id="`slide-${String(i)}`"
        >
          <h4 style="color: var(--primary-color)">{{ header.caption }}</h4>
          <h1 style="color: var(--primary-color)">{{ header.title }}</h1>
          <h3 style="color: white">{{ header.subtitle }}</h3>
        </div>
      </div>
    </div>

    <div class="content cta-container">
      <!-- <Button :text="content.cta" @click="$router.push({ name: 'signin' })" /> -->
      <Button
        :text="content.cta"
        @click="onContact"
      />
      <!-- <a
        style="padding-top: 1.6rem"
        :href="`mailto:${config.contact.address}?subject=${config.contact.subject}`"
      >
        {{ content.cta }}
      </a> -->
    </div>

  </div>
</template>

<script lang="ts">
import copy from '@/assets/copy/en/landing/Hero.yml'
import config from '@/config.json'
import Button from '@/components/Button.vue'
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Hero',
  components: { Button },
  setup() {
    // how fast each header cycles through
    const cyclePeriod = 5000
    const headerCount = copy.headers.length
    let activeSlide : number
    let timeoutId : number

    const onContact = () => {
      window.location.href = `mailto:${config.contact.address}?subject=${config.contact.subject}`
    }

    const scrollTo = () => {
      ++activeSlide
      if (activeSlide === headerCount) {
        activeSlide = 0
      }

      const e = document.getElementById(`slide-${activeSlide}`)
      const slides = document.getElementById('slides')
      if (e && slides) {
        const offset = e.clientWidth * activeSlide
        slides.scroll({
          top: 0,
          left: offset,
          behavior: 'smooth'
        })
      }
    }

    onMounted(() => {
      activeSlide = 0
      timeoutId = setInterval(scrollTo, cyclePeriod)
    })

    onBeforeUnmount(() => {
      clearInterval(timeoutId)
    })

    return {
      content: copy,
      onContact
    }
  }
})
</script>
