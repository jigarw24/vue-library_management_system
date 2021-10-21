import Home from "./components/Home.vue";
import signUp from "./components/signUp.vue";
import Login from "./components/Login.vue";
import addBook from "./components/addBook.vue";
import updateBook from "./components/updateBook.vue";
import addStudent from "./components/addStudent.vue";
import booksTransaction from "./components/booksTransaction.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: "Home",
        component: Home,
        path:"/"
    },
    {
        name: "signUp",
        component: signUp,
        path:"/signUp"
    },
    {
        name: "Login",
        component: Login,
        path:"/login"
    },
    {
        name: "addBook",
        component: addBook,
        path:"/addBook"
    },
    {
        name: "addStudent",
        component: addStudent,
        path:"/addStudent"
    },
    {
        name: "updateBook",
        component: updateBook,
        path:"/updateBook/:id"
    },
    {
        name: "booksTransaction",
        component: booksTransaction,
        path:"/booksTransaction"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
