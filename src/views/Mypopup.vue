<template>
  <div class="popup">
    <van-search
      v-model="searchValue"
      show-action
      shape="round"
      :placeholder="searchPlaceholder"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />
    <!-- 父组件向子组件传值 -->
    <!-- 历史搜索模块 -->
    <History v-if="showBlock === 1" :historyList="historyList" :historyHotSearch="historyHotSearch" @tagClick="tagClick"/>
    <!-- 搜索联想词模块 -->
    <ProductList v-else-if="showBlock === 2" :arrList="arrList" @cellClick="cellClick"/>
    <!-- 产品模块 -->
    <ProductModule v-else :filterCategory="filterCategory" :goodsList="goodsList" @cateSelected="cateSelected" @priceSelected="priceSelected"/>
  </div>
</template>

<script>
import History from '@/components/History.vue'
import ProductList from '@/components/ProductList.vue'
import ProductModule from '@/components/ProductModule.vue'
import { getPopupData, getSearchData, getSearchListData } from '@/request/api.js'
export default {
  data () {
    return {
      searchValue: '', // 搜索框数据
      searchPlaceholder: '', // 搜索框默认显示信息
      historyList: [], // 搜索历史记录
      historyHotSearch: [], // 热门搜索
      showBlock: 1, // 展示搜索的不同模块  1历史搜索模块  2联想模块  3产品模块
      filterCategory: [], // 给ProductModule组件传递的分类参数
      goodsList: [], //  给ProductModule组件传递的产品参数
      arrList: [], // 给ProductList组件传递的联想词数据
      orderProductModule: 'desc', // 子组件ProductModule传递要给接口请求数据 排列顺序
      categoryIdProductModule: 0, // 子组件ProductModule传递要给接口请求数据 分类别id
      sortProductModule: 'id' // 子组件ProductModule传递要给接口请求数据 可以根据是id或price排序 默认id
    }
  },
  methods: {
    // 子组件ProductModule通过自定义事件cateSelected传递过来的函数和选择类别值
    cateSelected (value) {
      // console.log(value)
      // 通过子组件传递过来的参数，重新触发onSearch，查询产品
      this.categoryIdProductModule = value
      this.onSearch()
    },
    // 子组件ProductModule通过自定义事件priceSelected传递过来的函数和选择价格值
    priceSelected (value) {
      this.orderProduct = value
      this.sortProductModule = 'price'
      this.onSearch()
    },
    // 子组件History通过自定义事件tagClick传递过来的函数和标签值
    tagClick (value) {
      this.searchValue = value
      this.onSearch()
    },
    // 子组件ProductList通过自定义事件cellClick传递过来的函数和联想词值
    cellClick (value) {
      this.searchValue = value
      this.onSearch()
    },
    // 搜索框输入信息后确定触发
    onSearch () {
      // 设置this的指向问题，防止this指向不明
      const _this = this
      getSearchData(
        {
          keyword: this.searchValue,
          page: 1, // 显示页数
          size: 20, // 一页显示个数
          order: this.orderProduct, // 排列顺序
          categoryId: this.categoryIdProductModule, // 分类别id
          sort: this.sortProductModule // 可以根据是id或price排序
        }
      ).then(res => {
        if (res.errno === 0) {
          this.showBlock = 3
          // console.log(res.data)
          const { filterCategory, goodsList } = res.data
          // filterCategory传递的属性名与vant组件库DropdownMenu下拉菜单所需要的字段属性名不同，需要修改
          const arr = JSON.parse(JSON.stringify(filterCategory).replace(/id/g, 'value').replace(/name/g, 'text'))
          _this.filterCategory = arr
          _this.goodsList = goodsList
        }
      })
    },
    // 点击取消按钮触发
    onCancel () {
      this.$router.go(-1)
    },
    // 搜索框输入时触发
    onInput () {
      this.showBlock = 2
      getSearchListData(
        {
          keyword: this.searchValue
        }
      ).then(res => {
        if (res.errno === 0) {
          this.arrList = res.data
        }
      })
    }
  },
  // 子组件组册
  components: {
    History, ProductModule, ProductList
  },
  created () {
    getPopupData().then(res => {
      // console.log(res)
      if (res.errno === 0) {
        const { defaultKeyword, historyKeywordList, hotKeywordList } = res.data
        this.searchPlaceholder = defaultKeyword.keyword
        this.historyList = historyKeywordList
        this.historyHotSearch = hotKeywordList
      }
    })
  }
}
</script>

<style lang="less" scoped>
.popup {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 99;
  background-color: #efefef;
}
</style>
