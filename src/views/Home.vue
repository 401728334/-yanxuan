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
      <!-- 图标导航 -->
      <van-grid :column-num="5">
        <van-grid-item v-for="item in channel" :key="item.id" :icon="item.icon_url" :text="item.name" />
      </van-grid>
      <!-- 品牌制造商直供 -->
      <div class="title">品牌制造商直供</div>
      <ul>
        <li v-for="item in brandList" :key="item.id">
          <img :src="item.pic_url" width="100%" style="display: block;"/>
          <h3>{{item.name}}</h3>
          <div class="price">{{item.floor_price | filterPrice}}</div>
        </li>
      </ul>
    </div>
    <!-- 新品首发 -->
    <div class="title">周一周四 · 新品首发</div>
    <Product :goodsList="newGoodsList" style="width: 100%; background-color: #fff;"/>
    <!-- 跳转popup -->
    <transition name="van-slide-right">
      <router-view v-if="$route.path === '/home/popup'"></router-view>
    </transition>
  </div>
</template>

<script>
import { getHomeData } from '@/request/api.js'
import Product from '@/components/Product'
export default {
  name: 'Home',
  data () {
    return {
      Searchvalue: '',
      banner: [], // 轮播图数据
      channel: [], // 图标导航数据
      brandList: [], // 品牌制造商数据
      newGoodsList: [] // 新品首发
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
        console.log(res.data)
        const { banner, channel, brandList, newGoodsList } = res.data
        this.banner = banner
        this.channel = channel
        this.brandList = brandList
        this.newGoodsList = newGoodsList
      }
    })
  },
  components: {
    Product
  }
}
</script>

<style lang="less" scoped>
/* .van-slide-right-enter, .van-slide-right-leave-to{
  left: 100%;
}
.van-slide-right-enter-active, .van-slide-right-leave-active{
  transition:left 2s;
}
.van-slide-right-enter-to, .van-slide-right-leave{
  left: 0;
} */
.home{
  padding-bottom: .5rem;
  div {
    .van-grid {
      margin-top: 1px;
    }
  }
  .title {
    margin-top: .2rem;
    line-height: .5rem;
    background-color: #fff;
    text-align: center;
    font-size: .18rem;
  }
  ul {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      position: relative;
      width: 49%;
      border-bottom: 1px solid #fff;
      h3 {
        position: absolute;
        top: .1rem;
        left: .1rem;
        font-weight: normal;
        font-size: .14rem;
      }
      .price {
        color: darkred;
        position: absolute;
        top: .35rem;
        left: .1rem;
      }
    }
  }
}
</style>
