<template>
    <Header />
    <h3>Add Member</h3>
    <input type="text" class="addStudentInput" v-model="student.name" placeholder="Enter Member Name" required/><br>
    <input type="text" class="addStudentInput" v-model="student.phone" placeholder="Enter Phone No" required/><br>
    <input type="text" class="addStudentInput" v-model="student.admission_year" placeholder="Enter year of Admission" required/><br>
    <input type="text" class="addStudentInput" v-model="student.address" placeholder="Enter Address" required/><br>
    <button class="addStudentBtn" v-on:click="addStudent">Add Member</button>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'addStudent',
    data() {
        return {
            student: {
                name:'',
                phone:'',
                admission_year:'',
                address:''
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({name:'signUp'});          
        }
    },
    components: {
        Header
    },
    methods: {
        async addStudent() {
            let result = await axios.post("http://localhost:3000/students_data",{
                'name': this.student.name,
                'phone': this.student.phone,
                'admission_year': this.student.admission_year,
                'address': this.student.address
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