<script setup lang="ts">
const message = defineModel('message', { default: "Hello World" })

function limpar() {
    message.value = ""
}
</script>

<template>
    <section>
        <h1>Meu primeiro componente</h1>

        <div>
            Dizendo olá, para variar: {{ message }}
            <button @click="limpar()">apaga tudo!</button>
        </div>

        <input v-model="message" />
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-wrap: wrap;
}

section>div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

div>button {
    width: 200px;
}
</style>