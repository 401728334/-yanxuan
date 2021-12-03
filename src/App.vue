<template>
  <div id="app">
    <router-view/>
    <AppTabbar v-if="$route.meta.isShowTabbar"/>
  </div>
</template>

<script>
import AppTabbar from '@/components/AppTabbar'

export default {
  components: {
    AppTabbar
  }
}
</script>

<style lang="less">
#app , page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  min-height: 100%;
}
html {
  font-size: 100px;
}
body {
  font-size: .14rem;
}
html ,body{
  height: 100%
}
</style>
