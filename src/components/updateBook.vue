<template>
    <Header />
    <h3>Update Book</h3>
    <input type="text" class="updateBookInput" v-model="book_data.book_name" placeholder="Enter Book Name" required/><br>
    <input type="text" class="updateBookInput" v-model="book_data.publisher" placeholder="Enter Publisher Name" required/><br>
    <input type="text" class="updateBookInput" v-model="book_data.publish_year" placeholder="Enter year of Publish" required/><br>
    <input type="text" class="updateBookInput" v-model="book_data.cost" placeholder="Enter Book Cost (INR)" required/><br>
    <button class="updateBookBtn" v-on:click="updateBook">Update</button>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'updateBook',
    data() {
        return {
            book_data: {
                book_name:'',
                publisher:'',
                publish_year:'',
                cost:'',
                id:''
            }
        }
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({name:'signUp'});          
        }
        let result = await axios.get(`http://localhost:3000/library_data?id=${this.$route.params.id}`);
        this.book_data = result.data[0];
    },
    components: {
        Header
    },
    methods: {
        async updateBook() {
            let result = await axios.put("http://localhost:3000/library_data/"+this.$route.params.id,{
                'book_name': this.book_data.book_name,
                'publisher': this.book_data.publisher,
                'publish_year': this.book_data.publish_year,
                'cost': this.book_data.cost
            });
            if (result.status==200) {
                this.$router.push({name:'Home'})
            }
        }
    }
}
</script>

<style>

</style>