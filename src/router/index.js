import VueRouter from 'vue-router'
import Vue from 'vue'

import register from 'views/register/register'
import Login from 'views/login/Login'
import UserInfo from 'views/userinfo/UserInfo'
import Home from 'views/home/Home'
import Edit from 'views/edit/Edit'
import Artical from 'views/artical/Artical'

Vue.use(VueRouter)
const routes=[
  {
    path:'/',
    component:Home,
    meta:{
      keepalive: true
    }
  },
  {
    path:'/register',
    component: register
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/userinfo',
    component:UserInfo,
    meta:{
      istoken:true
    }
  },
  {
    path:'/home',
    component:Home,
    meta:{
      keepalive: true
    }
  },
  {
    path:'/edit',
    component:Edit,
    mata:{
      istoken:true
    }
  },
  {
    path:'/artical/:id',
    component:Artical,
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to,from,next) => {
  if((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router