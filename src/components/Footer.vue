<template>
    <div class="footer">
        <hr>
        <p>In Association with IVL Global</p>
        <h6>Powered By- Google India</h6>
    </div>
</template>

<script>
export default {
    name:'Footer',
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