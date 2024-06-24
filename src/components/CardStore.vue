<template>
  <div class="card_store">
    <div class="row">
      <div class="col-9">
        <h4>{{ store.name }}</h4>
      </div>
      <div class="col-3 d-flex justify-content-end" v-if="imageUrl">
        <img class="card_store_image" :src="imageUrl" />
      </div>
      <div class="col-3 d-flex justify-content-end" v-else>
        <img class="card_store_image" src="../assets/images/icon-store.png" />
      </div>
    </div>
    <button class="btn btn-primary" @click="viewStore">Visualizar</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

interface StoreItem {
  id: number;
  name: string;
  image_url?: string | null
}

const props = defineProps<{ store: StoreItem }>();
const router = useRouter();

const viewStore = () => {
  router.push(`/stores/${props.store.id}`);
};


const imageUrl = computed(() => {
  return props.store && props.store.image_url ? `http://localhost:3000${props.store.image_url}` : '';
});

</script>

<style scoped>
.card_store {
  color: white;
  background-color: rgb(240, 208, 168);
  width: 300px;
  height: 120px;
  border-radius: 1rem;
  padding: 1rem;
}

.card_store_image {
  width: 50px;
  height: 50px;
}
</style>