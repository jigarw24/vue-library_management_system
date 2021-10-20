<template>
    <div class="nav-home">
        <router-link to="/">Home</router-link>
        <router-link to="addBook">Add Book</router-link>
        <a class="logoutAnchor" href="" v-on:click="logout">Logout</a>
    </div>
</template>

<script>
export default {
    name:'Header',
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({name:'Login'});          
        }
    }
}
</script>

<style>
</style>