<template>
  <div class="card_store" v-if="props.product.store_id">
    <router-link :to="`/stores/${props.product.store_id}/products/${props.product.id}`" class="store-link">
      <div class="row">
        <div class="col-6 d-flex justify-content-center align-items-center" v-if="imageUrl">
          <img class="card_store_image" :src="imageUrl" />
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center" v-else>
          <img class="card_store_image" src="../../assets/images/burger.jpg" />
        </div>
        <div class="col-6">
          <div>
            <p>{{ product.title }}</p>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { IProduct } from '@/interfaces/interfaces';

const props = defineProps<{ product: IProduct }>();

const imageUrl = computed(() => {
  return props.product && props.product.image_url ? `http://localhost:3000${props.product.image_url}` : '';
});

</script>

<style scoped>
.card_store {
  background-color: #FFFFFF;
  width: 350px;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  cursor: pointer;
}

.card_store_image {
  width: 90px;
  height: 70px;
  border-radius: 0.5rem;
}

.store-link {
  transition: transform 0.4s ease;
  text-decoration: none;
  color: #000000;
  border-radius: 8px;
  font-size: 17px;
}

.card_store:hover {
  background-color: #d1cecd;
}

.store-link:active {
  position: relative;
  top: 1px;
}
</style>