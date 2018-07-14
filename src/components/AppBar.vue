<template>
  <mu-appbar color="primary" class="appbar">
    <span v-if="!input">吟诗作赋</span>
    <input type="text" placeholder="输入关键字搜索" v-if="input" v-model="value" class="search-input" v-focus="focusStatus">
    <mu-button icon slot="right" @click="search">
      <mu-icon value="search"></mu-icon>
    </mu-button>
  </mu-appbar>
</template>

<script>
export default {
  data() {
    return {
      input: false,
      value: '',
      focusStatus: false
    }
  },
  methods: {
    search() {
      if (this.input) {
        this.$emit('search', this.value);
      } else {
        this.focusStatus = true;
      }
      this.input = !this.input;
    }
  }
}
</script>

<style scoped>
.appbar {
}
.search-input {
  color: #FFF;
  background: transparent;
  border: none;
  outline-style: none;
}
</style>
