<template>
  <nav ref="nav" :class="hide ? 'hidden' : ''" :style="transparent ? '' : 'background-color: var(--nav-background-color)'">
    <Logo class="logo" width="6rem" @click="$router.push({name: 'index'})" />

    <div class="spacer" />

    <a class="nav-link" @click="$router.push({name: 'faq'})" >{{ content.faq }}</a>
    <!-- <a class="nav-link">{{ content.blog }}</a> -->
    <!-- <a class="nav-link">{{ content.gopro }}</a> -->
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  width: 100%;
  height: 4rem;
  padding: 0 var(--content-margin);
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 2rem;

  transition: transform .3s ease-out;
}

.hidden {
  transform: translateY(-100%);
}

.spacer {
  flex-grow: 1;
}

.logo {
  transform: translateY(-3%);
}

@media (hover: hover) {
  .logo:hover {
    cursor: pointer;
  }
}

.nav-link {
  text-transform: uppercase;
  text-decoration: none;
  vertical-align: middle;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: .8rem;
  white-space: nowrap;
  letter-spacing: .16rem;
}
</style>

<script lang="ts">
import Logo from '@/components/Logo.vue';
import copy from '@/assets/copy/en/nav.yml'
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Nav',
  components: { Logo },
  props: {
    transparent: {
      type: Boolean,
      required: false,
      default: false
    },
    hideTreshold: {
      type: Number,
      required: false,
      default: 50
    }
  },
  setup(props) {
    const hide = ref(false)

    const onScroll = () => { hide.value = window.scrollY > props.hideTreshold }

    onMounted(() => document.addEventListener('scroll', onScroll))
    onBeforeUnmount(() => document.removeEventListener('scroll', onScroll))

    return {
      content: copy,
      hide
    }
  }
})
</script>
