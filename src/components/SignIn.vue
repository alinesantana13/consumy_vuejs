<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { auth } from '../auth'

const router = useRouter();
const email = defineModel<string>('email');
const password = defineModel<string>('password');
const awaiting = ref(false);

function onSubmit() {
    awaiting.value = true

    auth.signIn(email.value || '', password.value || '', () => {
        awaiting.value = false
        router.push('/')
    }, () => {
        awaiting.value = false
        console.error('Erro!')
    })
}
</script>

<template>
    <div class=container>
        <h1>Sign In</h1>
        <form @submit.prevent="onSubmit">
            <label>E-mail </label>
            <input class="form-control" style="width: 16rem" v-model="email" type="email"><br />
            <label>Password </label>
            <input class="form-control" style="width: 16rem" v-model="password" type="password"><br />

            <button class="btn btn-outline-secondary" type="submit" v-show="!awaiting">Sign In</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    background-color: rgba(240, 0, 0, 0.7);
    width: 25rem;
    padding: 2rem;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center
}
</style>