<template>
    <Header />
    <h1>Student Profile</h1>
    <div class="idCard">
        <img class="profilePicture" src="../assets/profile_icon.png" />
        <br>
        <div class="profileInfo">
            <pre><h4>Library Id:        {{student_data.id}}</h4></pre>
            <pre><h4>Name:              {{student_data.name}}</h4></pre>
            <pre><h4>Mobile:            {{student_data.phone}}</h4></pre>
            <pre><h4>Admission Year:    {{student_data.admission_year}}</h4></pre>
            <pre><h4>Address:           {{student_data.address}}</h4></pre>
        </div>
        <div class="librarianSignature">
            <img class="signatureImg" src="../assets/signature.png" />
            <h6>Head Librarian</h6>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios'
export default {
    name: 'profile',
    data() {
        return {
            student_data: {
                student_name: "",
                profile_img:"",
                phone:"",
                address:"",
                admission_year:"",
            }
        }
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({name:'signUp'});          
        }
        let result = await axios.get(`http://localhost:3000/students_data?id=${this.$route.params.student_id}`);
        this.student_data = result.data[0];
    },
    components: {
       Header 
    }

}
</script>

<style>
</style>