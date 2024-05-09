<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
</script>

<template>
  <RouterView />
  <Footer />
</template>

<style scoped>
Footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

@media (min-width: 1024px) {}
</style>
