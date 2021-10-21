<template>
    <Header />
    <h3>Book In/Out</h3>
    <input type="text" class="booksTransactionInput" v-model="book_id" placeholder="Enter Book Id" required/><br>
    <input type="text" class="booksTransactionInput" v-model="student_id" placeholder="Enter Student Id" required/><br>
    <select class="booksTransactionInput" name="inout" id="inout" v-model="inout" required>
        <option class="booksTransactionInput" value="issue">Issue</option>
        <option class="booksTransactionInput" value="return">Return</option>
    </select><br>
    <button class="booksTransactionBtn" v-on:click="doTransaction">Make Transaction</button>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios'
import moment from 'moment'
export default {
    name: 'booksTransaction',
    data() {
        return {
            book_id:null,
            student_id:null,
            inout:''
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
        async doTransaction() {
            let user = localStorage.getItem('user-info');
            user = JSON.parse(user);
            let bookData = await axios.get("http://localhost:3000/library_data/"+this.book_id);
            let membersData = await axios.get("http://localhost:3000/students_data/"+this.student_id);
            let isBookAvailable = bookData.data.is_available;
            if (isBookAvailable == undefined || isBookAvailable == true) {
                if(this.inout =="issue") {
                    // Updating Book Data
                    if (bookData.data.transactions) {
                        bookData.data.transactions.push({
                            issue_date: moment().format(),
                            issued_to_member: parseInt(this.student_id),
                            issued_by_librarian:user.id,
                            return_date:null,
                            returned_to_librarian:null
                        })
                    } else {
                        bookData.data.transactions = [];
                        bookData.data.transactions.push({
                            issue_date: moment().format(),
                            issued_to_member:parseInt(this.student_id),
                            issued_by_librarian:user.id,
                            return_date:null,
                            returned_to_librarian:null
                        })
                    }
                    bookData.data.is_available = false;
                    

                    let result = await axios.put("http://localhost:3000/library_data/"+this.book_id,bookData.data);
                    if (result.status==200) {
                        this.$router.push({name:'Home'})
                    }

                    // Updating members data
                    if (membersData.data.transactions) {
                        membersData.data.transactions.push({
                            "book_id": parseInt(this.book_id),
                            "issue_date": moment().format(),
                            "return_date": null
                        });
                    } else {
                        membersData.data.transactions = [];
                        membersData.data.transactions.push({
                            "book_id": parseInt(this.book_id),
                            "issue_date": moment().format(),
                            "return_date": null
                        });
                    }

                    let result_members = await axios.put("http://localhost:3000/students_data/"+this.student_id,membersData.data);
                    if (result_members.status==200) {
                        this.$router.push({name:'Home'})
                    }
                }
            } else if (isBookAvailable == false) {
                if (this.inout == "issue") {
                    alert('This Book is not available');
                    this.$router.push({name:'Home'})
                } else if(this.inout == "return") {
                    if (membersData.data.transactions == undefined) {
                        membersData.data.transactions = [];
                    }
                    if (bookData.data.transactions == undefined) {
                        bookData.data.transactions = [];
                    }
                    let found = false;
                    let index = 0;
                    // for members data
                    for (let req_transaction of membersData.data.transactions) {
                        index+=1;
                        if (req_transaction.book_id == this.book_id) {
                            found = true;
                            membersData.data.transactions[index-1].return_date = moment().format(); 
                            let result_members = await axios.put("http://localhost:3000/students_data/"+this.student_id,membersData.data);
                            if (result_members.status==200) {
                                this.$router.push({name:'Home'})
                            }
                        }
                    }
                    if (!found) {
                        alert("Given member has not borrowed this book");
                        this.$router.push({name:'Home'})
                    }
                    //  for library_data
                    index = 0;
                    for (let req_transaction of bookData.data.transactions) {
                        index+=1;
                        if (req_transaction.issued_to_member == this.student_id) {
                            bookData.data.transactions[index-1].return_date = moment().format();
                            bookData.data.transactions[index-1].returned_to_librarian = user.id;
                            bookData.data.is_available = true;
                            await axios.put("http://localhost:3000/library_data/"+this.book_id,bookData.data);
                        }
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>