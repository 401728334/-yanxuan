<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" indicator-color="#c93756">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" style="display: block;">
      </van-swipe-item>
    </van-swipe>
    <!-- tips提示区域 -->
    <Tips />
    <!-- 产品明细 -->
    <div class="info">
      <h3>{{info.name}}</h3>
      <p>{{info.goods_brief}}</p>
      <div class="price">
        {{info.retail_price | filterPrice}}
      </div>
    </div>
    <!-- 展示弹出层 -->
    <van-cell title="展示弹出层" is-link @click="show = true" />
    <!-- 商品参数 -->
    <div class="attribute">
      <h3>商品参数</h3>
      <ul>
        <li v-for="(item, index) in attribute" :key="index">
          <span>{{item.name}}</span>
          <section class="van-ellipsis">{{item.value}}</section>
        </li>
      </ul>
    </div>
    <!-- 商品参数图片 -->
    <div class="pictureAttribute" ref="pictureAttribute"></div>
    <!-- 常见问题 -->
    <div class="title">
      <span>常见问题</span>
    </div>
    <ul class="issue">
      <li v-for="item in issue" :key="item.id">
        <h3>{{item.question}}</h3>
        <p>{{item.answer}}</p>
      </li>
    </ul>
    <!-- 相关产品 -->
    <div class="title">
      <span>相关产品</span>
    </div>
    <!-- sku加入购物车弹出模块 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
    />
    <Product :goodsList="goodsList" style="background: #fff"/>
    <MyGoodsAction @addToCart="addToCart"/>
  </div>
</template>

<script>
import Tips from '@/components/Tips'
import MyGoodsAction from '@/components/MyGoodsAction'
import Product from '@/components/Product'
import { productDetailData, relatedProductsData } from '@/request/api.js'
export default {
  data () {
    return {
      // sku数据
      show: false, // 是否显示商品规格弹窗
      sku: {
        // 数据结构见下方文档
        tree: [],
        hide_stock: false, // 是否隐藏剩余库存
        price: 0, // 默认价格（单位元）
        stock_num: 0 // 商品总库存
      },
      goods: {
        // 数据结构见下方文档
        picture: 'https://img01.yzcdn.cn/1.jpg' // 默认商品 sku 缩略图
      },
      id: '', // 商品的id
      gallery: [], // 轮播图数据
      info: {}, // 产品明细
      attribute: [], // 商品参数
      issue: [], // 常见问题数据
      goodsList: [] // 相关产品数据
    }
  },
  components: {
    Tips, Product, MyGoodsAction
  },
  created () {
    // 商品详情数据
    productDetailData(
      {
        id: this.$route.query.id
      }
    ).then(res => {
      if (res.errno === 0) {
        // console.log(res.data)
        const { gallery, info, attribute, issue } = res.data
        this.gallery = gallery
        this.info = info
        this.attribute = attribute
        this.issue = issue
        // 将图片渲染到html中
        this.$refs.pictureAttribute.innerHTML = info.goods_desc
        // 将数据渲染到sku中
        this.goods.picture = info.list_pic_url
        this.sku.price = info.retail_price
        this.sku.stock_num = info.goods_number
      }
    })
    // 相关产品数据
    relatedProductsData(
      {
        id: this.$route.query.id
      }
    ).then(res => {
      if (res.errno === 0) {
        // console.log(res.data)
        const { goodsList } = res.data
        this.goodsList = goodsList
      }
    })
  },
  methods: {
    // 点击加入购物车触发
    addToCart () {
      if (this.show) {
        console.log('成功加入购物车')
      } else {
        this.show = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  background-color: #fff;
  text-align: center;
  padding: .25rem 0;
  border-bottom: 2px solid #efefef;
  h3 {
    font-weight: normal;
    line-height: .4rem;
    font-size: .2rem;
  }
  p {
    line-height: .3rem;
    font-size: .14rem;
  }
  .price {
    color: darkred;
    line-height: .3rem;
  }
}
.attribute {
  background-color: #fff;
  margin-top: .2rem;
  padding: .2rem 4%;
  h3 {
    font-weight: normal;
    font-size: .2rem;
    line-height: .4rem;
  }
  ul {
    li {
      background-color: #efefef;
      border-radius: .1rem;
      display: flex;
      margin-bottom: .05rem;
      justify-content: space-between;
      line-height: .35rem;
      span {
        width: 20%;
        text-align: right;
        color: #999;
      }
      section {
        flex: 1;
        padding-left: .2rem;
      }
    }
  }
}
/deep/.pictureAttribute {
  img {
    width: 100%;
    display: block;
  }
}
.title {
  width: 100%;
  background-color: #fff;
  height: .5rem;
  position: relative;
  &::before {
    content: '';
    width: 50%;
    height: 2px;
    position: absolute;
    display: block;
    background-color: #999;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
  }
  span {
    display: block;
    width: 30%;
    position: relative;
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
    font-size: .16rem;
    line-height: 0.5rem;
  }
}
.issue {
  padding: 0 2%;
  background-color: #fff;
  li {
    h3 {
      position: relative;
      font-weight: normal;
      line-height: .4rem;
      padding: 0 4%;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: darkred;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    p {
      line-height: .2rem;
      padding: 0 4%;
    }
  }
}
/deep/.van-goods-action {
    z-index: 9999;
}
.van-sku-container {
  min-height: auto;
}
</style>
