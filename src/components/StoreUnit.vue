<template>
  <div class="card">
    <a href="#">
      <div class="card_content row">
        <div class="card_img col-4 col-lg-4">
          <img class="card_img_logo" src="../assets/logo.svg" />
        </div>
        <div class="container_store_content col-6 col-lg-6">
          <h3 class="card_name">{{ store.name }}</h3>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Store {
  id: number;
  name: string;
}

const props = defineProps<{ store: Store }>();
</script>

<style scoped>
.card {
  width: 19rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
}

.card_content {
  display: flex;
  width: 18rem;
  height: 6rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255);
}

.card_img {
  display: flex;
  justify-content: center;
  border: 1px solid red;
}

.card_img_logo {
  width: 3.5rem;
}

.card_name {
  font-size: 1.1rem;
}
</style>