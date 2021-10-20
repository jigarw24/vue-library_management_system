<template>
  <!-- <login /> -->
  
  <!-- <header>
    <logoutbtn />
  </header> -->
  <!-- <addBook /> -->
  <router-view />
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    components: {
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .body {
    padding:0;
    margin:0;
  }

  .signUpInput, .loginInput, .addBookInput, .updateBookInput {
        padding-left:20px;
        width: 300px;
        height: 40px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid skyblue;
    }

    .addBtn, .loginBtn, .addBookBtn, .updateBookBtn {
        width: 320px;
        height: 40px;
        border: 1px solid skyblue;
        cursor: pointer;
        background: skyblue;
        color: white;
        
        /* background-color:rgb(176, 188, 253); */
    }

    .active, .addBtn:hover, .loginBtn:hover, .addBookBtn:hover, .updateBookBtn:hover, .bookdata button:hover {
        background-color: #666;
        color: white;
    }

    .nav-home {
      background-color: skyblue;
      overflow: hidden;
      width:100%;
      height: 50px;
    }

    .nav-home a {
      float: left;
      color: white;
      text-align: center;
      padding: 10px 14px;
      text-decoration: none;
      font-size: 16px;
      margin-right: 4px;
    }

    active, .nav-home a:hover {
        background-color: #666;
        color: white;
    }

    .bookdata {
      margin-left: 200px;
      margin-top: 25px;
      border-radius:10px;
      border-collapse: collapse;
      border: 1px solid #ddd;
    }

    .bookdata th {
      background-color: skyblue;
      color: white;
    }
    
    .bookdata th, .bookdata td {
      /* border: thin single black collapse; */
      border: 1px solid #ddd;
      padding: 8px;
    }

    .bookdata button {
      margin-left: 10px;
      margin-right: 10px;
    }
    .bookdata tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    .bookdata tr:last-of-type {
      border-bottom: 2px solid #009879;
    }

    .logoutAnchor {
      margin-left: 1000px;
    }
</style>
