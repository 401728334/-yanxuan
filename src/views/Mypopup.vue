<template>
  <div class="popup">
    <van-search
      v-model="searchValue"
      show-action
      shape="round"
      :placeholder="searchPlaceholder"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 父组件向子组件传值 -->
    <History :historyList="historyList" :historyHotSearch="historyHotSearch" />
  </div>
</template>

<script>
import History from '@/components/History.vue'
import { getPopupData } from '@/request/api.js'
export default {
  data () {
    return {
      searchValue: '', // 搜索框数据
      searchPlaceholder: '', // 搜索框默认显示信息
      historyList: [], // 搜索历史记录
      historyHotSearch: [] // 热门搜索
    }
  },
  methods: {
    // 搜索框输入信息后触发
    onSearch () {
    },
    // 点击取消按钮触发
    onCancel () {
      this.$router.go(-1)
    }
  },
  // 子组件组册
  components: {
    History
  },
  created () {
    getPopupData().then(res => {
      console.log(res)
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
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #efefef;
}
</style>
