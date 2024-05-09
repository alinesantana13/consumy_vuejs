<script setup lang="ts">
import UserProfile from './UserProfile.vue';
import { useRoute } from 'vue-router';
import { ref, watch, defineProps } from 'vue';
import { Auth } from '../auth'


const route = useRoute();
console.log(route.path);

const auth = new Auth()

const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = function () {
    auth.signOut(() => isLoggedIn.value = auth.isLoggedIn())
}

const propsItems = defineProps<{ items: Array<string> }>();

watch([isLoggedIn, currentUser], () => {
    shouldShowNavbar.value = isLoggedIn.value; // ou adicione outra lógica se precisar
});

const shouldShowNavbar = ref(false);
</script>

<template>
    <nav v-if="!shouldShowNavbar" class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
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
                </ul>
                <UserProfile :isLoggedIn="isLoggedIn" :currentUser="currentUser" :signOut="signOut" />
            </div>
        </div>
    </nav>
</template>
