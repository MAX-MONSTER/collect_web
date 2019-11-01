import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import DataList from '@/components/DataList'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/heloword',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/DataList',
      name: 'DataList',
      component: DataList
    }
  ]
})
