<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { auth } from '../auth';
import { ref } from 'vue';

const currentUser = ref(auth.currentUser());

const signOut = function () {
    auth.signOut(() => {
        currentUser.value = auth.currentUser()
    })
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Delivery</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/">
                            Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/">
                            Link
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <template v-if="currentUser">
                        <li class="d-flex align-items-center me-2" style="text-align: center;">
                            Hi, {{
                                currentUser.email }}</li>
                        <li class="btn btn-outline-success" style="width:5.5rem;" @click="signOut"> Sign Out</li>
                    </template>
                    <template v-else>
                        <RouterLink class="btn btn-outline-primary" :to="{ name: 'signin' }">
                            Sign In
                        </RouterLink>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>