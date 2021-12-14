<template>
  <div>
    <ul>
      <li v-for="item in goodsList" :key="item.id" @click="GoDetail(item.id)">
        <img :src="item.list_pic_url" width="100%" style="display: block;">
        <div class="title">{{item.name}}</div>
        <div class="price">{{ item.retail_price | filterPrice }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['goodsList'],
  data () {
    return {
    }
  },
  methods: {
    // 点击商品对应跳转到商品详情页
    GoDetail (id) {
      this.$router.push({ path: '/productdetail', query: { id: id } })
      document.documentElement.scrollTop = 0
      setTimeout(() => {
        this.$router.go(0)
      }, 10)
      // 回到页面顶部
    }
  }
}
</script>

<style lang="less" scoped>
div {
  background-color: #efefef;
}
ul {
  // margin: 2%;
  padding: .1rem 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 49%;
    background-color: #fff;
    text-align: center;
    line-height: .3rem;
    margin-bottom: .1rem;
  }
  .title {
    background-color: #fff;
  }
  .price {
    background-color: #fff;
    color: darkred;
  }
}
</style>
