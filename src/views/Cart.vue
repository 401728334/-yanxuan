<template>
  <div>
    <Tips />
    <van-checkbox-group v-model="result">
      <van-checkbox :disabled="isEdit" class="cart-chb" :name="item.product_id" v-for="item in cartList" :key="item.id" @click="goodsChecked(item)">
        <van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.retail_price"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
          />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="cartDel(item)"/>
          </template>
        </van-swipe-cell>
        <van-stepper v-if="isEdit" v-model="item.number" @change="NumberEdit(item)"/>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar :price="cartTotal.checkedGoodsAmount * 100" button-text="提交订单">
      <van-checkbox v-model="checkedAll" :disabled="isEdit">全选</van-checkbox>
      <template #tip>
        累计共<span>{{cartTotal.checkedGoodsCount}}</span>件商品，可点击<van-button :type="isEdit ? 'danger' : 'primary'" size="small" @click="isEdit = !isEdit">{{ isEdit ? '完成编辑' : '编辑'}}</van-button>按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from '@/components/Tips'
import { CartListData, CartCheckedData, CartStepNumData, CartDeleteData } from '@/request/api.js'
export default {
  data () {
    return {
      result: [], // 商品复选框组选中的状态
      cartList: [], // 购物车商品数据
      cartTotal: {}, // 购物车总信息
      isEdit: false // 是否点击了编辑，true为点击编辑
    }
  },
  computed: {
    checkedAll: {
      get () {
        // 当商品选中数组长度=购物车商品数组长度
        return this.result.length === this.cartList.length
        // 后台有提供数据时可使用
        // return this.cartTotal.checkedGoodsCount === this.cartTotal.goodsCount
      },
      set (val) {
        const arr = []
        this.cartList.map(val => {
          arr.push(val.product_id)
        })
        CartCheckedData({
          isChecked: val ? 1 : 0,
          productIds: arr.join()
        }).then(res => {
          if (res.errno === 0) {
            this.CartData(res.data)
          }
        })
      }
    }
  },
  components: {
    Tips
  },
  created () {
    CartListData().then(res => {
      // 渲染（需要抽离）
      if (res.errno === 0) {
        this.CartData(res.data)
      }
    })
  },
  methods: {
    // 删除商品
    cartDel (item) {
      CartDeleteData({
        productIds: item.product_id.toString()
      }).then(res => {
        if (res.errno === 0) {
          this.CartData(res.data)
          this.$toast.success('删除成功')
        }
      })
    },
    // 点击步进器时触发
    NumberEdit (item) {
      CartStepNumData({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number,
        productId: item.product_id
      }).then(res => {
        if (res.errno === 0) {
          this.CartData(res.data)
        }
      })
    },
    // 点击商品时触发
    goodsChecked (data) {
      if (this.isEdit) {
        return ''
      } else {
        CartCheckedData({
          isChecked: data.checked ? 0 : 1,
          productIds: data.product_id.toString()
        }).then(res => {
          if (res.errno === 0) {
            this.CartData(res.data)
          }
        })
      }
    },
    // 购物车数据渲染
    CartData (data) {
      const { cartList, cartTotal } = data
      this.cartList = cartList
      this.cartTotal = cartTotal
      // 这里清空一下 this.result，防止存留有上一次请求时候添加的数据
      this.result = []
      // cartList里每一项的checked为1时将商品添加到result数组中，则表示选中
      this.cartList.map(val => {
        if (val.checked === 1) {
          this.result.push(val.product_id)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-submit-bar {
  bottom: 50px;
}
/deep/.van-checkbox__label {
  flex: 1;
}
.cart-chb {
    background-color: #fff;
    padding: 3% 2%;
    border-bottom: 1px solid #ccc;
}
.van-button {
  margin: 0 .05rem;
}
.van-submit-bar__tip {
    display: flex;
    align-items: center;
}
.van-stepper {
  text-align: right;
}
.delete-button {
  height: 100%;
}
</style>
