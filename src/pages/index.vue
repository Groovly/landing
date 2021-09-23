<template>
  <Hero />
  <About />
  <HowItWorks />
  <CallToAction />
</template>

<route lang="yaml">
meta:
  layout: landing
</route>

<script lang="ts">
import { defineComponent } from 'vue'
import Hero from '@/components/landing/Hero.vue'
import About from '@/components/landing/About.vue'
import HowItWorks from '@/components/landing/HowItWorks.vue'
import CallToAction from '@/components/landing/CallToAction.vue'

export default defineComponent({
  components: {
    Hero,
    About,
    HowItWorks,
    CallToAction
  }
})
</script>
