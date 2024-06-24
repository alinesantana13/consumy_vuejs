<script setup lang="ts">
interface CurrentUser {
  email: string | null;
}

const props = defineProps<{ isLoggedIn: boolean, currentUser: CurrentUser | null, signOut: () => void }>();

</script>

<template>
  <main>
    <template v-if="props.isLoggedIn">
      <ul class="navbar-nav">
        <li class="nav-item p-1">
          Hi, {{ props.currentUser && props.currentUser.email }}
        </li>
        <li><a class="btn btn-primary" @click="signOut">Sign Out</a></li>
      </ul>
    </template>
    <template v-else>
      <ul class="navbar-nav">
        <li>
          <RouterLink class="btn btn-primary" :to="{ name: 'signin' }">
            Sign In
          </RouterLink>
        </li>
      </ul>
    </template>
  </main>
</template>