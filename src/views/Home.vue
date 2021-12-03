<template>
  <div class="home">
    <div v-if="$route.path === '/home'">
      <!-- 搜索栏 -->
      <van-search
        v-model="Searchvalue"
        disabled
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
        @click="goPopup"
      />
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#c93756">
        <van-swipe-item v-for='item in banner' :key='item.id'>
          <img :src="item.image_url" width="100%" style="display: block;">
        </van-swipe-item>
      </van-swipe>
      <p v-for="item in 99" :key="item">{{item}}</p>
    </div>
    <!-- 跳转popup -->
    <transition name="van-slide-right">
      <router-view v-if="$route.path === '/home/popup'"></router-view>
    </transition>
  </div>
</template>

<script>
import { getHomeData } from '@/request/api.js'
export default {
  name: 'Home',
  data () {
    return {
      Searchvalue: '',
      banner: [] // 轮播图数据
    }
  },
  methods: {
    // 点击搜索框跳转路由
    goPopup () {
      this.$router.push('/home/popup')
    }
  },
  created () {
    getHomeData().then(res => {
      if (res.errno === 0) {
        const { banner } = res.data
        this.banner = banner
        // console.log(this.banner)
      }
    })
  }
}
</script>

<style lang="less" scoped>
/* .slide-enter, .slide-leave-to{
  left: 100%;;
}
.slide-enter-active, .slide-leave-active{
  transition:left 1s;
}
.slide-enter-to, .slide-leave{
  left: 0;
} */
</style>
