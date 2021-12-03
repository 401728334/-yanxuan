<template>
  <van-row>
    <van-col span="8"><van-icon name="checked" color="#8b0000"/> 30天无忧退货</van-col>
    <van-col span="8"><van-icon name="checked" color="#8b0000"/> 48小时快速退费</van-col>
    <van-col span="8"><van-icon name="checked" color="#8b0000"/> 满88元免邮费</van-col>
  </van-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .van-row {
    line-height: .3rem;
    padding: 0 .1rem;
    .van-col {
      font-size: .1rem;
      &:nth-child(2) {
        text-align: center;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
</style>
