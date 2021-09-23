<style scoped>
  #cta {
    position: relative;
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-image: url('@/assets/images/concert.jpg');
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: opacity .5s linear;
    opacity: 0;
    position: relative;
  }

  :deep(h1), :deep(h4) {
    text-align: center;
  }

  .jump-logo {
    width: 8rem;
    margin-bottom: 1rem;
  }
</style>

<template>
  <div id="cta">
    <div ref="cta_section" class="copy content" style="padding-top: 10rem">
      <h1>{{ content.title }}</h1>
      <h4 style="margin-bottom: 2rem">{{ content.caption }}</h4>
      <Button :text="content.cta" @click="onContact" />
    </div>

    <div ref="cta_footer" class="copy content">
      <h4 style="color: white; padding-top: 2rem">{{ content.sponsor }}</h4>
      <a href="https://www.jumpmusic.eu/" target="_blank">
        <img
          class="jump-logo"
          src="@/assets/images/jump.png"
          alt="JUMP Europe logo"
        >
      </a>
      <h4 style="color: white">{{ copyright }}</h4>
    </div>

  </div>
</template>

<script lang="ts">
import copy from '@/assets/copy/en/landing/CallToAction.yml'
import config from '@/config.json'
import Button from '@/components/Button.vue'
import { computed, ref, onMounted } from 'vue'
import { onElementVisible } from '@/lib/IntersectionObserver'

export default {
  name: 'CallToAction',
  components: { Button },
  setup() {
    const cta_section = ref(null)
    const cta_footer = ref(null)

    const onContact = () => {
      window.location = `mailto:${config.contact.address}?subject=${config.contact.subject}`
    }

    onMounted(() => {
      onElementVisible(cta_section.value, () => { cta_section.value.style.opacity = 1.0 })
      onElementVisible(cta_footer.value, () => { cta_footer.value.style.opacity = 1.0 })
    })

    const copyright = computed(() => copy.rightsNotice.replace('{YEAR}', new Date().getFullYear()))

    return {
      content: copy,
      cta_section,
      cta_footer,
      copyright,
      onContact
    }
  }
}
</script>
