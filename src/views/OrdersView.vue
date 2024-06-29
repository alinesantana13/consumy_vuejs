<template>
  <div class="order_container">
    <hr />
    <div class="list_orders_title d-flex justify-content-center">
      <h4>Orders</h4>
    </div>
    <hr />
    <div class="">
      <div v-if="orders.length > 0" class="orders_list">
        <div class="orders_list_cards" v-for="order in orders" :key="order.id">
          <CardOrder :order="order" />
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
    let ordersData = await response;

    ordersData = ordersData.map((order: IOrder) => ({
      ...order,
      payment_status: mapPaymentStatus(order.payment_status)
    }));

    orders.value = ordersData.filter((order: IOrder) => order.order_items.length > 0);
    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

function mapPaymentStatus(status: string): string {
  switch (status) {
    case 'paid_out':
      return 'Paid out';
    case 'in_the_delivery':
      return 'In the delivery';
    case 'failed':
      return 'Failed';
    default:
      return status;
  }
}

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

.list_orders_title {
  margin-bottom: 1rem;
}

.orders_list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  ;
}

.orders_list_cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.empty_message {
  margin-top: 1rem;
  text-align: center;
}
</style>