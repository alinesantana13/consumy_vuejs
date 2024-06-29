import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia';
import type { IProduct, ICartItem } from '../interfaces/interfaces';
import { createStorage, type SimpleStorage } from '../storage'

const storage: SimpleStorage = createStorage(true);

export const useCounterCart = defineStore('counter', () => {
  // Helper functions
  function loadCartFromStorage() {
    const cart = storage.get('shoppingCart');
    return cart ? JSON.parse(cart) : [];
  }

  function saveCartToStorage(cart: ICartItem[]) {
    storage.store('shoppingCart', JSON.stringify(cart));
  }

  //state
  const count = ref(0);
  const shoppingCart = ref<{ product: IProduct, quantity: number }[]>(loadCartFromStorage());

  // Update count based on the loaded shopping cart
  count.value = shoppingCart.value.reduce((total, item) => total + item.quantity, 0);

  // Watch for changes in shoppingCart to update storage
  watch(shoppingCart, (newCart) => {
    saveCartToStorage(newCart);
  }, { deep: true });

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

  function removeFromCart(product: IProduct) {
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

  function clearCart() {
    shoppingCart.value = [];
    count.value = 0;
    storage.remove('shoppingCart');
  }

  function clearProductFromCart(product: IProduct) {
    shoppingCart.value = shoppingCart.value.filter(item => item.product.id !== product.id);
    count.value = shoppingCart.value.reduce((total, item) => total + item.quantity, 0);
    storage.store('shoppingCart', JSON.stringify(shoppingCart.value));
  }

  //getters
  const totalCart = computed(() => shoppingCart.value.length);
  const totalAmount = computed(() => shoppingCart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0));

  return { count, shoppingCart, addToCart, removeFromCart, clearProductFromCart, clearCart, totalCart, totalAmount }
})