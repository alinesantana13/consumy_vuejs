<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

const router = useRouter()

const awaiting = ref(false)

const email = defineModel<string>('email')
const password = defineModel<string>('password')
const password_confirmation = defineModel<string>('password_confirmation')

function onSubmit(form: Event) {
  const auth = new Auth()
  awaiting.value = true
  auth.signUp(email.value || ''
    , password.value || '',
    password_confirmation.value || ''
    , () => {
      awaiting.value = false
      router.push('/signin')
    }, () => {
      awaiting.value = false
      console.log('não foi dessa vez!')
    })
}
</script>

<template>
  <div class="container_signin">
    <div class="container_signin_center signup">
      <div class="signin_title">
        <h1>Sign Up</h1>
      </div>
      <div class="signin_form">
        <form @submit.prevent="onSubmit">
          <label>E-mail: </label>
          <input class="form-control" v-model="email" type="email" required><br />
          <label>Password: </label>
          <input class="form-control" v-model="password" type="password" required><br />
          <label>Password Confirmation </label>
          <input class="form-control" v-model="password_confirmation" type="password" required><br />
          <button class="btn btn-primary" type="submit" v-show="!awaiting">Create</button>
        </form>
      </div>
      <div>
        <RouterLink class="" :to="{ name: 'signin' }">
          Sign In
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style setup>
.signup {
  height: 450px;
}
</style>