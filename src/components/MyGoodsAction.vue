<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon :icon="isStar ? 'star' : 'star-o'" :text="isStar ? '已收藏' : '未收藏'" :color="isStar ? 'darkred' : '#929292'" @click="isStar =! isStar"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" to="/cart"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="nowBuy"/>
    </van-goods-action>
  </div>
</template>

<script>
export default {
  props: ['badge'],
  data () {
    return {
      isStar: false // 收藏按钮
    }
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
