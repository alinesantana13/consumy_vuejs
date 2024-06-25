import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignInView.vue'
import SignUp from '../views/SignUpView.vue'
import StoresView from '@/views/StoresView.vue'
import StoreView from '@/views/StoreView.vue'
import ListProduct from '@/components/product/ListProduct.vue'
import UnitProduct from '@/components/product/UnitProduct.vue'
import { Auth } from '../auth';
import ShoppingCart from '@/views/ShoppingCart.vue'
import OrdersView from '@/views/OrdersView.vue'

const auth = new Auth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoresView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stores/:id/',
      component: StoreView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: ListProduct,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/:productId',
          component: UnitProduct,
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
