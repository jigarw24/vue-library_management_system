<template>
    <div class="nav-home">
        <router-link to="/" style="margin-top:8px">Home</router-link>
        <router-link to="addBook" style="margin-top:8px">Add Book</router-link>
        <router-link to="addStudent" style="margin-top:8px">Add Member</router-link>
        <router-link to="booksTransaction" style="margin-top:8px">Books In/Out</router-link>
        <a class="logoutAnchor" v-on:click="logout"><img class ="logoutIcon" src="../assets/logout_icon.png"></a>
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