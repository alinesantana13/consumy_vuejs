<script setup lang="ts">
import UserProfile from './UserProfile.vue';
import { ref, watch, defineProps } from 'vue';
import { Auth } from '../auth'
import { useCounterCart } from '@/store/cart';
import { storeToRefs } from 'pinia';

const cart = useCounterCart();
const { count } = storeToRefs(cart);

interface CurrentUser {
    email: string | null;
}

const auth = new Auth()

const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref<CurrentUser | null>(auth.currentUser())

const signOut = function () {
    auth.signOut(() => isLoggedIn.value = auth.isLoggedIn())
}

const propsItems = defineProps<{ items: Array<string> }>();

watch([isLoggedIn, currentUser], () => {
    shouldShowNavbar.value = isLoggedIn.value;
});

const shouldShowNavbar = ref(false);
</script>

<template>
    <nav v-if="!shouldShowNavbar" class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">#</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-for="(item, index) in propsItems.items" :key="index">
                        <RouterLink class="nav-link active" aria-current="page" :to="{ name: item.toLowerCase() }">{{
                            item }}
                        </RouterLink>
                    </li>
                    <li class="nav-item cart-icon">
                        <RouterLink class="nav-link active" :to="{ name: 'cart' }"><img
                                src="../assets/images/icon-cart.png" style="width: 25px" /> {{ count }}</RouterLink>
                    </li>
                </ul>
                <UserProfile :isLoggedIn="isLoggedIn" :currentUser="currentUser" :signOut="signOut" />
            </div>
        </div>
    </nav>
</template>

<style setup>
/*.cart-icon {
    background-image: url('../assets/images/icon-cart.png');
}*/
</style>
