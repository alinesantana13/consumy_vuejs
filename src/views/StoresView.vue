<template>
  <div class="stores_container mt-2">
    <div class="stores_name">
      <h1>Stores</h1>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-6 col-12 stores_cards" v-for="store in stores" :key="store.id">
        <CardStore class="mb-3" :store="store" />
      </div>
    </div>
    <div class="stores_button">
      <button class="btn btn-success" @click="newStore">New Store</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardStore from '../components/CardStore.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Store } from '../requests/store';
import type { IStore } from '../interfaces/interfaces';

const storeInstance = new Store();

const stores = ref<IStore[] | null>(null);
const error = ref<string | null>(null)
const currentePageStore = ref(1);

const fetchStores = async () => {
  try {
    const response = await storeInstance.GetStores(currentePageStore.value);
    stores.value = await response.result.stores;

    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

onMounted(() => {
  fetchStores();
});

const router = useRouter();

const newStore = () => {
  router.push(`/stores/new`);
};

</script>

<style scoped>
.stores_name {
  color: white;
  display: flex;
  justify-content: center;
}

.stores_cards {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stores_button {
  display: flex;
  justify-content: center;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
