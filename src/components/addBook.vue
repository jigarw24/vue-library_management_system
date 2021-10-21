<template>
    <Header />
    <h3>Add Book</h3>
    <input type="text" class="addBookInput" v-model="book_data.book_name" placeholder="Enter Book Name" required/><br>
    <input type="text" class="addBookInput" v-model="book_data.publisher" placeholder="Enter Publisher Name" required/><br>
    <input type="text" class="addBookInput" v-model="book_data.publish_year" placeholder="Enter year of Publish" required/><br>
    <input type="text" class="addBookInput" v-model="book_data.cost" placeholder="Enter Book Cost (INR)" required/><br>
    <button class="addBookBtn" v-on:click="addBook">Add Book</button>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'addBook',
    data() {
        return {
            name:'',
            book_data: {
                book_name:'',
                publisher:'',
                publish_year:'',
                cost:''
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        this.name = JSON.parse(user).name;
        if (!user) {
            this.$router.push({name:'signUp'});          
        }
    },
    components: {
        Header
    },
    methods: {
        async addBook() {
            let result = await axios.post("http://localhost:3000/library_data",{
                'book_name': this.book_data.book_name,
                'publisher': this.book_data.publisher,
                'publish_year': this.book_data.publish_year,
                'cost': this.book_data.cost
            });
            console.warn(result);
            if (result.status==201) {
                this.$router.push({name:'Home'})
            }
        }
    }
}
</script>

<style>

</style>