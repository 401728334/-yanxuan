<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item disabled title="综合" />
      <van-dropdown-item v-model="priceValue" title="价格"  :options="priceOption"  @change="priceSelected" />
      <van-dropdown-item v-model="defaultSelected" title="分类" :options="filterCategory" @change="cateSelected" />
    </van-dropdown-menu>
    <van-empty v-if="goodsList.length === 0" image="search" description="您搜索的产品不存在" />
    <Product v-else :goodsList="goodsList"/>
  </div>
</template>

<script>
import Product from '@/components/Product'
export default {
  props: ['filterCategory', 'goodsList'],
  data () {
    return {
      priceValue: '', // 价格排列顺序默认打勾
      priceOption: [
        { text: '价格由高到低', value: 'desc' },
        { text: '价格由低到高', value: 'asc' }
      ],
      defaultSelected: null // 分类默认打勾选项
    }
  },
  components: {
    Product
  },
  methods: {
    // 分类选择事件
    cateSelected (value) {
      // console.log(value)
      // 子组件给父组件传值，通过$emit传递自定义事件
      this.$emit('cateSelected', value)
    },
    // 价格排序事件
    priceSelected (value) {
      // console.log(value)
      this.$emit('priceSelected', value)
    }
  },
  mounted () {
    this.filterCategory.map((val, index) => {
      if (val.checked) {
        this.defaultSelected = val.value
      }
    })
  }
}
</script>

<style lang="less" scoped>

</style>
