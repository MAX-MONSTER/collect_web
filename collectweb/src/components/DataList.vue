<template>
  <div class="list">

    <table class="metable" border="1" style="margin: 0 auto">
      <thead>
      <tr>
        <th>公司名称</th>
        <th>注册号</th>
        <th>注册时间</th>
        <th>抓取时间</th>
      </tr>
      </thead>
      <tbody id="appproject">
      <tr v-for="li in showList">
        <td style="background: antiquewhite">{{li.name}}</td>
        <td>{{li.entrngNo}}</td>
        <td>{{li.ctime}}</td>
        <td>{{li.inTime}}</td>
      </tr>
      </tbody>
      &emsp; &emsp; &emsp;
      <button @click="getData(1)" class="btn-red">上一页</button>
      &emsp; &emsp; &emsp;
      当前页：   <input type="text" v-model="page"/>
      &emsp; &emsp; &emsp;
      <button @click="getData(2)" class="btn-red">下一页</button>
      &emsp; &emsp; &emsp; &emsp; &emsp;
      总页数：<input type="text" v-model="totalP" style="width: 20px;" />
      &emsp; &emsp; &emsp; &emsp; &emsp;
      <button  @click="backIndex()" class="btn-red">回到首页</button>
      &emsp; &emsp; &emsp; &emsp; &emsp;
      <button @click="getOut" class="btn-blue">退出登录</button>
    </table>


  </div>

</template>

<script>
  import axios from 'axios';
  import global from '@/components/Global';
  export default {
    name: 'DataList',
    data() {

      return {
        sPage: 1,
        showList: [],
        page: 1,
        totalP:0,
        token : localStorage.getItem("check_info")
      }
    },
    mounted() {
      if(localStorage.getItem("check_info")==null){
        this.$router.push('/')
      };
      this.getData(3);
    },
    methods: {
      getOut(){
        axios.post(`http://${global.url}/getOut`, {
          taskId: localStorage.getItem("taskId")        // 参数 firstName
        })
          .then((response) => {
          if(response.data.code === 0
      )
        {
          localStorage.removeItem("check_info")
          localStorage.removeItem("check_info")
          this.$router.push('/')
        }
      else
        {
          alert(response.data.msg)
        }
      })
      .
        catch(function (error) {
          console.log(error);
        });
      },
      backIndex(){
        this.$router.push('/heloword')
      },
      getData(i) {
        var pageNum = this.page;
        if (i == 1) {
          if(pageNum === 1){
            alert("已经是第一页");
            return
          }
          pageNum = pageNum - 1
        }
        else if(i === 2)
          {
            if(this.totalP === pageNum){
              alert("已经是最后一页");
              return
            }
          pageNum = pageNum + 1
        }
        axios.post(`http://${global.url}/getDataList`, {
          index: pageNum        // 参数 firstName
        },{headers:{
          'token':this.token
          }})
          .then((response) => {
          if(response.data.code === 0){
          this.showList = response.data.data.list;
          this.page = response.data.data.index;
          this.totalP=response.data.data.pageTotal;
        }else{
            console.log(response.data.code)
          alert(response.data.msg);
          this.$router.push('/')
        }
      })
      .
        catch(function (error) {
          console.log(error);
          alert(error)
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
  .btn-blue {
    width: 100px;
    height: 40px;
    border: 1px solid #d2a000;
    box-shadow: 0 2px 4px #fedd71 inset, 0 -1px 0 #a38b39 inset, 0 -2px 3px #fedd71 inset;
    background: -webkit-linear-gradient(top, #fece34, #d8a605);
    background: -moz-linear-gradient(top, #fece34, #d8a605);
    background: linear-gradient(top, #fece34, #d8a605);

  }
</style>
