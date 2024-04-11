<template>
    <div>
        <h1>Resultado da API:</h1>
        <ul>
            <li v-for="item in apiData" :key="item.id">{{ item.title }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            apiData: []
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('https://localhost:3000/welcome');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados da API');
                }
                const data = await response.json();
                this.apiData = data;
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    }
};
</script>