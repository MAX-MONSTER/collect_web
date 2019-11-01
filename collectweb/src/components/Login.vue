s<template>
  <div class="hello">

    <h2> LOGIN IN </h2>
    <ul>
       用户名： <input v-model="msg" placeholder="请输入用户名">
    </ul>
    <ul>
       密   码：   <input type="password" class="form-control" v-model="pass" placeholder="请输入密码">

    </ul>
    <p></p>
    <button  @click="getIn" class="btn-red" >LOGIN</button>

  </div>
</template>

<script>
  import axios from 'axios';
  import md5 from 'js-md5';
  import global from '@/components/Global';

  export default {
    name: 'Login',
    data() {
      return {
        msg: '',
        pass: '',
      }
    },
  mounted() {
  if(localStorage.getItem("check_info")!=null){
    this.$router.push('/heloword')
  }
  },
    methods: {
      getIn() {
        axios.post(`http://${global.url}/getIn`, {
          userName: this.msg,        // 参数 firstName
          password: md5(this.pass+"collet_90")    // 参数 lastName
        })
          .then((response) => {
            if(response.data.code === 0){
              localStorage.setItem("check_info",response.data.data)
              console.log("login_seccsss"+response.data.data)
              this.$router.push('/heloword')
            }else {alert(response.data.msg)}
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>

  .btn-red {
    width: 100px;
    height: 40px;
    border:1px solid #1e7db9;
    box-shadow: 0 1px 2px #8fcaee inset,0 -1px 0 #497897 inset,0 -2px 3px #8fcaee inset;
    background: -webkit-linear-gradient(top,#42a4e0,#2e88c0);
    background: -moz-linear-gradient(top,#42a4e0,#2e88c0);
    background: linear-gradient(top,#42a4e0,#2e88c0);

  }
</style>
