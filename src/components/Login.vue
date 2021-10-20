<template>
    <div>
        <h3>Login</h3><br>
        <input type="number" class="loginInput" v-model="mobile" placeholder="Enter your Mobile No" required/><br>
        <input type="password" class="loginInput" v-model="password" placeholder="Enter your Password" required/><br>
        <button class="loginBtn" v-on:click="login">Login</button>
        <p>
            <router-link to="/signUp">SignUp</router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Login',
    data() {
        return {
            mobile:'',
            password:''
        }
    },
    methods: {
        async login() {
            let result = await axios.get(`http://localhost:3000/users?mobile=${this.mobile}&password=${this.password}`);
            if (result.status==200 && result.data.length>0) {
                localStorage.setItem("user-info",JSON.stringify(result.data[0]));
                this.$router.push({name:'Home'})
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({name:'Home'});          
        }
    }
}
</script>

<style>

</style>