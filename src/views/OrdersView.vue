<template>
  <div class="order_container">
    <hr />
    <div class="list_orders_title d-flex justify-content-center">
      <h4>Orders</h4>
    </div>
    <hr />
    <div class="row">
      <div v-if="orders.length > 0">
        <div class="col-lg-2 col-md-3 col-sm-4 col-12 list_orders_card mx-4" v-for="order in orders" :key="order.id">
          <CardOrder v-if="order.order_items.length > 0" :order="order" />
        </div>
      </div>
      <div v-else>You have not asked</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardOrder from '../components/order/CardOrder.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Order } from '../requests/order';
import type { IOrder } from '../interfaces/interfaces';

const orderInstance = new Order();

const orders = ref<IOrder[]>([]);
const error = ref<string | null>(null);

// const imageUrl = computed(() => {
//   return store.value && store.value.image_url ? `http://localhost:3000${store.value.image_url}` : '';
// });

const fetchOrders = async () => {
  try {
    const response = await orderInstance.GetOrders();
    orders.value = await response;
    console.log(orders);
    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

const route = useRoute();

const router = useRouter();

onMounted(() => {
  fetchOrders();
});

</script>

<style scoped>
.order_container {
  color: white;
  background-color: rgb(240, 208, 168);
  margin: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  ;
}
</style>