import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { IProduct } from '../interfaces/interfaces';

export const useCounterCart = defineStore('counter', () => {
  //state
  const count = ref(0);
  const shoppingCart = ref<{ product: IProduct, quantity: number }[]>([]);

  //actions
  function addToCart(product: IProduct) {
    const existingProduct = shoppingCart.value.find(item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
      count.value++;
    } else {
      if (shoppingCart.value.length > 0) {
        const storeIdInCart = shoppingCart.value[0].product.store_id;
        if (storeIdInCart == product.store_id) {
          shoppingCart.value.push({ product, quantity: 1 });
          count.value++;
        } else {
          console.log('stores must be the same')
        }
      } else {
        shoppingCart.value.push({ product, quantity: 1 });
        count.value++;
      }
    }
  }

  function removeToCart(product: IProduct) {
    const existingProductIndex = shoppingCart.value.findIndex(item => item.product.id === product.id);

    if (existingProductIndex !== -1) {
      const existingProduct = shoppingCart.value[existingProductIndex];
      existingProduct.quantity--;
      count.value--;

      if (existingProduct.quantity === 0) {
        shoppingCart.value.splice(existingProductIndex, 1);
      }
    }
  }

  //getters
  const totalCart = computed(() => shoppingCart.value.length);
  const totalAmount = computed(() => shoppingCart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0));

  return { count, shoppingCart, addToCart, removeToCart, totalCart, totalAmount }
})