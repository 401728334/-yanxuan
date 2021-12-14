<template>
  <div>
    <!-- 头像用户名区域 -->
    <van-row @click="login">
      <van-col span="6">
        <img :src="avatarSrc" />
      </van-col>
      <van-col span="10">{{loginUsername}}</van-col>
      <van-col span="8">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!-- 功能模块 -->
    <van-grid :column-num="3" square>
      <van-grid-item @click="iconClick" icon="shopping-cart-o" text="我的订单" />
      <van-grid-item @click="iconClick" icon="balance-pay" text="优惠劵" />
      <van-grid-item @click="iconClick" icon="gift-o" text="礼品卡" />
      <van-grid-item @click="iconClick" icon="like-o" text="我的收藏" />
      <van-grid-item @click="iconClick" icon="guide-o" text="我的足迹" />
      <van-grid-item @click="iconClick" icon="vip-card-o" text="会员福利" />
      <van-grid-item @click="iconClick" icon="location-o" text="地址管理" />
      <van-grid-item @click="iconClick" icon="shield-o" text="账号安全" />
      <van-grid-item @click="iconClick" icon="service-o" text="联系客服" />
      <van-grid-item @click="iconClick" icon="question-o" text="帮助中心" />
      <van-grid-item @click="iconClick" icon="good-job-o" text="意见反馈" />
    </van-grid>
    <!-- 点击登录弹出的登录框 -->
    <div class="login_model_div" v-if="isShowLogin">
      <!-- 背景遮罩层 -->
      <div class="login_bc"  @click="showLogin"></div>
      <!-- 登陆表单 -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginUsers } from '@/request/api.js'
export default {
  data () {
    return {
      avatarSrc: require('@/assets/avatar.png'),
      username: '',
      password: '',
      // 控制登录框的显示与隐藏
      isShowLogin: false,
      loginUsername: '点击登陆'
    }
  },
  created () {
    // 判断User有没有token，有的话直接渲染头像和名称
    const token = localStorage.getItem('token')
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.loginUsername = userInfo.username
      this.avatarSrc = userInfo.avatar
    }
  },
  methods: {
    iconClick () {
      this.$toast('此功能尚未开放')
    },
    // 登录框登陆事件
    onSubmit (values) {
      loginUsers(
        {
          username: values['用户名'],
          pwd: values['密码']
        }
      ).then(res => {
        if (res.errno === 0) {
          const { token, userInfo } = res.data
          const newUserInfo = JSON.stringify(userInfo)
          localStorage.setItem('token', token)
          localStorage.setItem('userInfo', newUserInfo)
          // 修改页面的头像和名字
          this.loginUsername = userInfo.username
          this.avatarSrc = userInfo.avatar
          this.$toast.success('登陆成功')
          setTimeout(() => {
            this.showLogin()
          }, 1000)
        }
      })
      // 判断是否需要跳转到前一页面
      if (this.$route.query.redirect) {
        setTimeout(() => {
          this.$toast({
            message: '正在跳转页面',
            type: 'loading',
            onClose: () => {
              this.$router.push({
                path: this.$route.query.redirect
              })
            }
          })
        }, 2000)
      }
    },
    // 关闭登录框
    showLogin () {
      this.isShowLogin = false
    },
    // 点击登录
    login () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.isShowLogin = true
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.van-row {
  background-color: #333333;
  padding: .2rem 2%;
  .van-col {
    color: #fff;
    line-height: .8rem;
    font-size: .2rem;
    img {
      width: 0.8rem;
      display: block;
      border-radius: 50%;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.login_model_div {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  .login_bc {
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
  }
  .van-form {
    position: absolute;
    width: 90%;
    top: 40vh;
    left: 50%;
    transform: translateX(-50%);
    padding: .35em 2%;
    background-color: #fff;
  }
}
</style>
