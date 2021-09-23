<template>
  <main>
    <router-view />
    <Nav />
  </main>
</template>

<route lang="yaml">
meta:
  layout: landing
</route>

<script lang="ts">
import Nav from '@/components/Nav.vue'
import { defineComponent } from 'vue'

export default {
  name: 'DefaultLayout',
  components: { Nav }
}
</script>
