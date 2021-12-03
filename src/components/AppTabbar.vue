<template>
  <div>
    <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/topic" icon="label-o">专题</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    // console.log(this.$route)
  },
  computed: {
    // active: {
    //   get () {
    //     if (this.$route.path === '/home') {
    //       return 0
    //     } else if (this.$route.path === '/topic') {
    //       return 1
    //     } else if (this.$route.path === '/category') {
    //       return 2
    //     } else if (this.$route.path === '/cart') {
    //       return 3
    //     } else if (this.$route.path === '/user') {
    //       return 4
    //     } else {
    //       return 0
    //     }
    //   },
    //   set () {}
    // }
  }
}
</script>

<style>

</style>
