<template>
  <main>
    <router-view />
    <Nav transparent />
  </main>
</template>

<script lang="ts">
import Nav from '@/components/Nav.vue'
import { defineComponent } from 'vue'

export default {
  name: 'LandingLayout',
  components: { Nav }
}
</script>
