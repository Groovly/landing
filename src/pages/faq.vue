<style scoped>
#faq {
  padding-top: 7rem;
  display: grid;
  place-content: center;
  background: #e6e6e6;
}
</style>

<template>
  <div id="faq">
    <FaqCopy class="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FaqCopy from '@/assets/copy/en/faq.md'

export default defineComponent({
  name: 'FAQ',
  components: {
    FaqCopy
  }
})
</script>
