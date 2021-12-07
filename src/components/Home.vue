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
            <th>Availability</th>
            <th>Alloted to</th>
            <th>Actions</th>
        </tr>
        <tr v-for="(item,index) in library_data" :key="item.id">
            <td>{{index+1}}</td>
            <td>{{item.id}}</td>
            <td>{{item.book_name}}</td>
            <td>{{item.publisher}}</td>
            <td>{{item.publish_year}}</td>
            <td>{{item.cost}}</td>
            <td v-if="item.is_available== undefined || item.is_available==true">Available</td>
            <td v-else>Not Available</td>
            <td v-if="item.is_available== undefined || item.is_available==true"></td>
            <td v-else><router-link :to="'/profile/'+item.transactions[item.transactions.length-1].issued_to_member">{{item.transactions[item.transactions.length-1].issued_to_member}}</router-link></td>
            <td>
                <router-link :to="'/updateBook/'+item.id"><img class ="updateIcon" src="../assets/edit_icon.png"></router-link>
                <button v-on:click="deleteBook(item.id)"><img class ="deleteIcon" src="../assets/delete_icon.png"></button>
            </td>
        </tr>
    </table>
    <Footer />
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import axios from 'axios';
export default {
    name: 'Home',
    data() {
        return {
            name:'',
            library_data:''
        }
    },
    async mounted() {
        let login_user = localStorage.getItem('user-info');
        if (!login_user) {
            this.$router.push({name:'signUp'});          
        }
        this.loadTable();
    },
    components: {
        Header,
        Footer
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
            let logged_in_user = JSON.parse(user).name;
            this.name = logged_in_user;
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