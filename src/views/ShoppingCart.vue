<template>
  <div class="shopping_cart_container">
    <div class="row shopping_cart_header">
      <div class="col-lg-2 col-md-3 col-sm-3 col-6">
        <h1>Store</h1>
      </div>
    </div>
    <div class="shopping_cart_content">
      <div class="row mx-2">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in shoppingCart" :key="index">
              <td>{{ item.product.title }}</td>
              <td>
                <div class="input-group">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="decreaseQuantity(item.product)">-</button>
                  <input style="width: 25px;" type="text" class="form-control text-center" :value="item.quantity"
                    readonly>
                  <button class="btn btn-outline-secondary" type="button"
                    @click="increaseQuantity(item.product)">+</button>
                </div>
              </td>
              <td>$ {{ item.product.price }}</td>
              <td>$ {{ (item.quantity * item.product.price).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total</td>
              <td>$ {{ totalAmount.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="shopping_cart_price">
          <div class="d-flex shopping_cart_price_item">
            <p>Subtotal</p>
            <p>$ {{ totalAmount.toFixed(2) }}</p>
          </div>
          <div class="d-flex shopping_cart_price_item">
            <p>Delivery fee</p>
            <p>$ 0,00</p>
          </div>
          <div class="d-flex shopping_cart_price_item">
            <p class="fw-bold">Total</p>
            <p class="fw-bold">$ {{ totalAmount.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mx-2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Finish
        </button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="color: black;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Payment</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div v-if="emptyCart">
                <div class="d-flex align-items-center">
                  <label>Pay now? </label>
                  <select v-model="payNow" class="form-select mx-2 w-25">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div v-if="payNow == 'Yes'"><br />
                  <input class="form-control" type="number" v-model="totalAmount" disabled /><br />
                  <input class="form-control" type="number" v-model="cardNumber" /><br />
                  <input class="form-control" type="month" v-model="expirationDate" /><br />
                  <input class="form-control" type="number" v-model="cvvNumber" /><br />
                </div>
                <div v-else>
                </div>
              </div>
              <div v-else>
                <p>Cart empty, please fill cart.</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-if="payNow == 'Yes'">Pay</button>
              <button type="button" class="btn btn-primary" v-else-if="emptyCart">Purchase</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IProduct } from '../interfaces/interfaces';
import { useCounterCart } from '@/store/cart';
import { storeToRefs } from 'pinia';

const cart = useCounterCart();
const { count, shoppingCart, totalAmount } = storeToRefs(cart);

function increaseQuantity(product: IProduct) {
  cart.addToCart(product);
}

function decreaseQuantity(product: IProduct) {
  cart.removeToCart(product);
}
const emptyCart = shoppingCart.value.length > 0;
const payNow = ref("No");
const showModal = ref(false);
const modalTitle = ref('Aviso');
const modalMessage = ref('Shopping Cart vazio.');
const router = useRouter();

const value = ref(0);
const cardNumber = ref(null);
const expirationDate = ref(null);
const cvvNumber = ref(null);
console.log(value);
console.log(cardNumber);
console.log(expirationDate);
console.log(cvvNumber);

const viewPayment = () => {
  if (shoppingCart.value.length > 0) {
    router.push(`/payment`);
  }
  console.log('Shopping Cart vazio')
};

</script>

<style scoped>
.shopping_cart_container {
  color: white;
  margin-top: 1rem;
  margin-left: 1rem;
}

.shopping_cart_header {
  margin-bottom: 1rem;
}

.shopping_cart_content {
  color: white;
  background-color: rgb(240, 208, 168);
  margin-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  ;
}

.shopping_cart_image {
  width: 100px;
}

.shopping_cart_price {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.shopping_cart_price_item {
  justify-content: space-between;
  width: 200px;
  gap: 1.5rem;
  color: red;
}
</style>
