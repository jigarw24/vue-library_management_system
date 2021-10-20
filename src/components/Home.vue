<template>
    <Header />
    <h2>Library Management System</h2>
    <!-- <h3>Hello {{name}}, Welcome</h3> -->
    <table class="bookdata">
        <tr v-if="library_data.length>0">
            <th>Sr.No.</th>
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Publisher</th>
            <th>Publish Year</th>
            <th>Cost(INR)</th>
            <th>Actions</th>
        </tr>
        <tr v-for="(item,index) in library_data" :key="item.id">
            <td>{{index+1}}</td>
            <td>{{item.id}}</td>
            <td>{{item.book_name}}</td>
            <td>{{item.publisher}}</td>
            <td>{{item.publish_year}}</td>
            <td>{{item.cost}}</td>
            <td>
                <router-link :to="'/updateBook/'+item.id">Update</router-link>
                <button v-on:click="deleteBook(item.id)">Delete</button>
            </td>
        </tr>
    </table>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            name:'',
            library_data:''
        }
    },
    async mounted() {
        this.loadTable();
    },
    components: {
        Header
    },
    methods: {
        async deleteBook(id) {
            let result = await axios.delete("http://localhost:3000/library_data/"+id);
            console.warn(result);
            if (result.status==200) {
                this.loadTable();
            }
        },
        async loadTable() {
            let user = localStorage.getItem('user-info');
            this.name = JSON.parse(user).name;
            if (!user) {
                this.$router.push({name:'signUp'});          
            }
            let result = await axios.get(`http://localhost:3000/library_data`);
            this.library_data = result.data;
        }
    }
}
</script>

<style>

</style>