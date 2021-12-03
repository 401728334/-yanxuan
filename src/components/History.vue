<template>
  <div>
    <div class="history-hot" v-if="isShow">
      <div class="history-top">
        <h4>历史记录</h4>
        <van-icon name="delete-o" @click="clearFn" />
      </div>
      <div class="down">
        <van-tag v-for="(item, index) in historyList" :key="index" plain type="default" @click="tagClick(item)">{{item}}</van-tag>
      </div>
    </div>
    <div class="history-hot">
      <div class="history-top">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag plain v-for="(item, index) in historyHotSearch" :key="index" :type="item.is_hot===1 ? 'danger' : 'default'" @click="tagClick(item.keyword)">{{item.keyword}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { clearHistory } from '@/request/api.js'
export default {
  props: ['historyList', 'historyHotSearch'],
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    // 点击标签触发，将值传递给父组件Mypopup调用搜索
    tagClick (val) {
      this.$emit('tagClick', val)
    },
    // 点击删除图标触发
    clearFn () {
      const _this = this
      clearHistory().then(res => {
        if (res.errno === 0) {
          _this.$toast.success('清空成功')
          setTimeout(() => {
            this.isShow = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.history-hot {
  background-color: #fff;
  padding: 0 2%;
  margin-bottom: .2rem;
  .history-top {
    padding-top: 2%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    height: .5rem;
    align-items: center;
    font-size: .2rem;
    h4 {
      font-weight: normal;
    }
  }
  .down {
    .van-tag {
      padding: .04rem;
      margin-right: .1rem;
      margin-bottom: .1rem;
    }
  }
}
</style>
