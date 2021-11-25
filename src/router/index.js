import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 路由重定向
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        // 子路由path不需要加/ 否则需要连着父级一起写，/home/mypopup
        path: 'popup',
        name: 'popup',
        component: () => import(/* webpackChunkName: "Mypopup" */ '../views/Mypopup.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
