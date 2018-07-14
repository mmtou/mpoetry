<template>
  <mu-bottom-nav class="bottom-nav" :value="value">
    <mu-bottom-nav-item title="发现" icon="touch_app" value="discovery" to="/"></mu-bottom-nav-item>
    <mu-bottom-nav-item title="挑战" icon="favorite" value="c" to="/"></mu-bottom-nav-item>
    <mu-bottom-nav-item title="我的" icon="person" value="user" to="user"></mu-bottom-nav-item>
  </mu-bottom-nav>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
.bottom-nav {
  position: fixed !important;
  bottom: 0;
  width: 100%;
}
</style>
