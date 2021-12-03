import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Topic from '../views/Topic.vue'
import Category from '../views/Category.vue'
import Cart from '../views/Cart.vue'
import User from '../views/User.vue'
import ProductDetail from '../views//ProductDetail.vue'

// 防止路由重复点击报错
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function (location) {
//   return originalPush.call(this, location).catch(err => { console.log(err) })
// }

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

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
    // 是否显示底部tabbar栏
    meta: {
      isShowTabbar: true
    },
    component: Home,
    children: [
      {
        // 子路由path不需要加/ 否则需要连着父级一起写，/home/mypopup
        path: 'popup',
        name: 'popup',
        component: () => import(/* webpackChunkName: "Mypopup" */ '../views/Mypopup.vue')
      }
    ]
  },
  {
    path: '/topic',
    name: 'Topic',
    meta: {
      isShowTabbar: true
    },
    component: Topic
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      isShowTabbar: true
    },
    component: Category
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      isShowTabbar: true
    },
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      isShowTabbar: true
    },
    component: User
  },
  {
    path: '/productdetail',
    name: 'ProductDetail',
    component: ProductDetail
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫/路由拦截（前置beforeEach和后置afterEach） 判断是否有token值
// beforeEach前置导航守卫路由跳转之前
// to 要去哪一个页面
// from 从哪个页面来
// next 一定要有，表示允许访问进行跳转
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/cart') {
    if (!token) {
      // 因为router/index.js没有this
      Vue.prototype.$toast.fail('请先登陆')
      setTimeout(() => {
        next('/user')
      }, 1000)
    } else {
      next()
    }
    return
  }
  next()
})

export default router
