<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in arrList" :key="item" :title="item" @click="cellClick(item)"/>
    </van-list>
  </div>
</template>

<script>
export default {
  props: ['arrList'],
  data () {
    return {
      finished: true
    }
  },
  methods: {
    // 点击联想词触发，通过自定义事件传递给父级
    cellClick (value) {
      this.$emit('cellClick', value)
    }
  }
}
</script>

<style></style>
