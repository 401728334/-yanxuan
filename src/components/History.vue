<template>
  <div>
    <div class="history-hot">
      <div class="history-top">
        <h4>历史记录</h4>
        <van-icon name="delete-o" />
      </div>
      <div class="down">
        <van-tag v-for="(item, index) in historyList" :key="index" plain type="default">{{item}}</van-tag>
      </div>
    </div>
    <div class="history-hot">
      <div class="history-top">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag plain v-for="(item, index) in historyHotSearch" :key="index" :type="item.is_hot===1 ? 'danger' : 'default'">{{item.keyword}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['historyList', 'historyHotSearch']
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
