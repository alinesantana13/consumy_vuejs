<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <header>
    <NavBar :items="['Home', 'Stores', 'Orders']" />
  </header>
  <main>
    <RouterView />
  </main>
  <!-- <footer>
    <Footer />
  </footer> -->
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
