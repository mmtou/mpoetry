<template>
<div class="login">
  <div class="appbar">
    <div class="title">
      欢迎来到{{appName}}
    </div>
    <div class="tips">
      了解{{appName}}
    </div>
  </div>
  <div class="login-type">
    <div class="wechat-login">
      <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">
          <img src="../../assets/images/wechat.png" alt="wechat">
        </button>
      <div class="text">
        微信登录
      </div>
    </div>
    <div class="mobile-login">
      <button @click="getUserInfo">
        <img src="../../assets/images/mobile.png" alt="mobile">
      </button>
      <div class="text">
        密码登录
      </div>
    </div>
  </div>
  <div class="agreement">
    登录代表你已同意<span>《{{appName}}用户协议》</span>
  </div>
  <!-- <a href="/pages/index/main">登录</a> -->
</div>
</template>

<script>
export default {
  data() {
    return {
      appName: '吟诗作赋',
      userInfo: {}
    }
  },
  methods: {
    getUserInfo(e) {
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
