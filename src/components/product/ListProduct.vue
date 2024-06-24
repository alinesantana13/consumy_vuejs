<template>
  <div class="mx-4">
    <hr />
    <div class="row mb-3">
      <div class="col-sm-10 col-12 store_products_title">
        <h4>Products</h4>
      </div>
      <div class="col-sm-2 col-12 store_products_title_button">
        <button class="btn btn-primary" @click="newProduct">New Product</button>
      </div>
    </div>
    <hr />
    <div class="row" v-if="products">
      <div class="stores_card_products col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"
        v-for="product in products" :key="product.id">
        <CardProduct :product="product" :store="store" />
      </div>
    </div>
    <div v-else>
      <p>Loading</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardProduct from './CardProduct.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Store } from '../../requests/store';
import { Product } from '@/requests/product';
import type { IStore, IPagination, IProduct } from '../interfaces/interfaces';

const storeInstance = new Store();
const productInstance = new Product();

const store = ref<IStore | null>(null);
const error = ref<string | null>(null);

const products = ref<IProduct[] | null>(null);
const paginationProduct = ref<IPagination[] | null>(null);
const errorProduct = ref<string | null>(null)
const currentePageProduct = ref(1);

const fetchStore = async (id: number) => {
  try {
    const response = await storeInstance.GetStore(id);
    store.value = await response;
    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

const route = useRoute();

const fetchProduct = async (id: number) => {
  try {
    const response = await productInstance.GetProducts(id, currentePageProduct.value);
    products.value = await response.result.products;
    if (response.result.pagination) {
      paginationProduct.value = response.result.pagination;
    }
    return response;
  } catch (err: any) {
    errorProduct.value = err.toString()
  }
};

const router = useRouter();

const id = Number(route.params.id);
onMounted(() => {
  if (!isNaN(id)) {
    fetchStore(id);
    fetchProduct(id);
  } else {
    error.value = "Invalid store ID.";
  }
});

const newProduct = () => {
  router.push(`/stores/${id}/products/new`);
}
</script>

<style scoped>
.stores_card_products {
  margin-bottom: 1rem;
  display: flex;
}

.store_products_title {
  display: flex;
  justify-content: center;
}
</style>