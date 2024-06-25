<template>
  <div class="card_order" v-if="props.order">
    <div class="row">
      <div class="col-9">
        <h5>Order</h5>
      </div>
      <div class="col-3">
        <p>id {{ props.order.id }}</p>
      </div>
    </div>
    <div>
      <hr />
      <div>
        <div class="row" v-for="(order_items, index) in props.order.order_items" :key="index">
          <div class="col-3">
            <img src="../../assets/images/burger.jpg" style="width: 50px;" />
          </div>
          <div class="col-9">
            <p>{{ order_items.product_title }}</p>
            <p>$ {{ (order_items.price / order_items.amount).toFixed(2) }} x {{ order_items.amount }} = {{
              order_items.price }}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div class="card_order_summary">
      <p>Subtotal</p>
      <p>{{ order.total_order_items }}</p>
    </div>
    <div class="card_order_summary">
      <p>Delivery fee</p>
      <p>$ 0,00</p>
    </div>
    <div class="card_order_summary">
      <p>Total</p>
      <p>{{ order.total_order_items }}</p>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { IOrder } from '@/interfaces/interfaces';

const props = defineProps<{ order: IOrder }>();

</script>

<style scoped>
.card_order {
  background-color: #FFFFFF;
  color: #000000;
  width: 300px;
  border-radius: 1rem;
  padding: 1rem 1rem 0.5rem 1rem;
}

.card_order_summary {
  display: flex;
  justify-content: space-between
}
</style>