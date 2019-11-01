<template>
  <div class="hello flex">
    <ul class="flex-1">
      <li
        v-for="(item, i) in list"
        :key="i"
        :id="`li-${i}`"
        @click="copy(item)">
        {{ item }}
      </li>
    </ul>
    <div class="btn-wrap">
      <p><a style="background: #42b983;color: antiquewhite">注 册 号</a> <input v-model="engrno" style="color: #42b983"
                                                                             type="text" name="" id=""/></p>
      <p>
        <button @click="start" class="btn-red">开始查询</button>
      </p>
      <p>
        <button @click="stop" class="btn-red">结束查询</button>
      </p>
      <p>
        <button @click="getList" class="btn-blue">查看数据库数据</button>
        <button @click="getOut" class="btn-blue">退出登录</button>
      </p>
    </div>
    <input type="text" v-model="selectText" id="inp" style="display: none;"/>


  </div>

</template>

<script>
  import axios from 'axios';
  import global from '@/components/Global';

  export default {
    name: 'HelloWorld',
    data() {


      return {
        token : localStorage.getItem("check_info"),
        path: "ws://"+global.url+"/ws/"+localStorage.getItem("check_info"),
        socket: "",
        list: [],
        selectText: '',
        engrno: '',
      }
    },
    mounted() {

        if(localStorage.getItem("check_info")==null){
          this.$router.push('/')
        }

      // 初始化
      this.init();
    },
    methods: {
      getOut(){
        axios.post(`http://${global.url}/getOut`, {
          taskId:   localStorage.getItem("taskId")         // 参数 firstName
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
      copy(str) {
        this.selectText = str;
        this.$nextTick(() => {
          const dom = document.getElementById('inp');
        if (dom) {
          dom.select();
          document.execCommand("Copy");
        }
      })
        ;
      },
      start() {
        axios.post(`http://${global.url}/startQuer`, {
          ENTREGNO: this.engrno        // 参数 firstName
        },{headers:{
            'token':this.token
          }})
          .then((response) => {
          if(response.data.code === 0
      )
        {
          localStorage.setItem("taskId", response.data.data)
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
      getList() {
        this.$router.push('/DataList')
      },
      stop() {
        axios.defaults.headers.common["token"] = this.toekn;
        axios.post(`http://${global.url}/stopQuer`, {
          ENTREGNO: localStorage.getItem("taskId")        // 参数 firstName
        },{headers:{
            'token':this.token
          }})
          .then((response) => {
          if(response.data.code === 0
      )
        {
          alert(response.data.msg)
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
      init: function () {
        if (typeof (WebSocket) === "undefined") {
          alert("您的浏览器不支持socket")
        } else {
          // 实例化socket
          this.socket = new WebSocket(this.path)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        }
      },
      open: function () {
        console.log("socket连接成功")
      },
      error: function () {
        console.log("连接错误")
      },
      getMessage: function (msg) {
        console.log(msg.data)
        this.list.push(msg.data);
      },
      send: function () {
        this.socket.send(params)
      },
      close: function () {
        console.log("socket已经关闭")
      }
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flex {
    display: flex;
  }

  .flex-1 {
    flex: 1;
  }

  .btn-wrap {
    width: 500px;
  }

  .hello {
    padding: 10px;
    margin: 0 auto;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: block;
    background: #42b983;
    margin-bottom: 10px;

  }

  a {
    color: #42b983;
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

  .btn-red {
    width: 100px;
    height: 40px;
    border: 1px solid #1e7db9;
    box-shadow: 0 1px 2px #8fcaee inset, 0 -1px 0 #497897 inset, 0 -2px 3px #8fcaee inset;
    background: -webkit-linear-gradient(top, #42a4e0, #2e88c0);
    background: -moz-linear-gradient(top, #42a4e0, #2e88c0);
    background: linear-gradient(top, #42a4e0, #2e88c0);

  }
</style>
