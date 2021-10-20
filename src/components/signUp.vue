<template>
    <div>
        <h3>SignUp</h3><br>
        <!-- <form @submit.prevent="addBook()"> -->
        <input type="text" class="signUpInput" v-model="name" placeholder="Enter your Name" required/><br>
        <input type="number" class="signUpInput" v-model="mobile" placeholder="Enter your Mobile No" required/><br>
        <input type="password" class="signUpInput" v-model="password" placeholder="Enter your Password" required/><br>
        <button class="addBtn" v-on:click="signUp">Add</button>
        <!-- </form> -->
        <p>
            <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'signUp',
        data() {
            return {
                name:'',
                mobile:'',
                password:''
            }
        },
        methods: {
            async signUp() {
                let result = await axios.post("http://localhost:3000/users",{
                    'name': this.name,
                    'mobile': this.mobile,
                    'password': this.password
                });
                console.warn(result);
                if (result.status==201) {
                    localStorage.setItem("user-info",JSON.stringify(result.data));
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