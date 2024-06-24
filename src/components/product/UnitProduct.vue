<template>
  <div class="unit_product mt-4">
    <hr />
    <div class="row">
      <div class="col-12 d-flex justify-content-center" v-if="imageUrl">
        <img class="unit_product_image" :src="imageUrl" />
      </div>
      <div class="col-12 d-flex justify-content-center" v-else>
        <img class="unit_product_image" src="../../assets/images/icon-store.png" />
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-center">
      <div class="" v-if="product">
        <div>
          <h5>{{ product.title }}</h5>
          <p>Ótimo produto</p>
          <p>$ {{ product.price }}</p>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Product } from '@/requests/product';
import type { IProduct } from '@/interfaces/interfaces';

const productInstance = new Product();
const error = ref<string | null>(null);

const product = ref<IProduct | null>(null);
const errorProduct = ref<string | null>(null)

const route = useRoute();

const fetchProduct = async (idStore: number, idProduct: number) => {
  try {
    const response = await productInstance.GetProduct(idStore, idProduct);
    product.value = await response;
    return response;
  } catch (err: any) {
    errorProduct.value = err.toString()
  }
};

const imageUrl = computed(() => {
  return product.value && product.value.image_url ? `http://localhost:3000${product.value.image_url}` : '';
});

onMounted(() => {
  const storeId = Number(route.params.id);
  const productId = Number(route.params.productId);
  if (!isNaN(storeId) && !isNaN(productId)) {
    fetchProduct(storeId, productId);
  } else {
    error.value = "Invalid store ID.";
  }
});

</script>

<style scoped>
.unit_product {
  padding-left: 1rem;
}

.unit_product_image {
  width: 200px;
  ;
}

.unit_product_buttons {
  width: 200px;
  display: flex;
  gap: 1rem;
}
</style>