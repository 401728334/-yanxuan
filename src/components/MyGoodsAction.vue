<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon :icon="isStar ? 'star' : 'star-o'" :text="isStar ? '已收藏' : '未收藏'" :color="isStar ? 'darkred' : '#929292'" @click="isStar =! isStar"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="nowBuy"/>
    </van-goods-action>
  </div>
</template>

<script>
import { cartNumbersData } from '@/request/api.js'
export default {
  data () {
    return {
      isStar: false, // 收藏按钮
      badge: 0 // 购物车数量徽标
    }
  },
  created () {
    cartNumbersData().then(res => {
      if (res.errno === 0) {
        console.log(res.data)
        const { cartTotal } = res.data
        this.badge = cartTotal.goodsCount
      }
    })
  },
  methods: {
    // 点击立即购买
    nowBuy () {
      this.$toast('此功能尚未开放')
    },
    // 点击加入购物车
    addToCart () {
      this.$emit('addToCart')
    }
  }
}
</script>

<style>

</style>
