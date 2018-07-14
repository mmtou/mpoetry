<template>
<div class="index">
  <app-bar/>

  <mu-list class="list">
    <mu-list-item button>
      <mu-list-item-action>
        <mu-icon value="notifications_none"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>我的消息</mu-list-item-title>
    </mu-list-item>
    <mu-divider/>
    <mu-list-item button>
      <mu-list-item-action>
        <mu-icon value="thumb_up"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>我喜欢的</mu-list-item-title>
    </mu-list-item>
    <mu-divider/>
    <mu-list-item button>
      <mu-list-item-action>
        <mu-icon value="comment"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>我评论的</mu-list-item-title>
    </mu-list-item>
    <mu-divider/>
    <mu-list-item button>
      <mu-list-item-action>
        <mu-icon value="share"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>分享好友</mu-list-item-title>
    </mu-list-item>
    <mu-divider/>
    <mu-list-item button>
      <mu-list-item-action>
        <mu-icon value="settings"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>设置</mu-list-item-title>
    </mu-list-item>
    <mu-divider/>
  </mu-list>

  <bottom-nav value="user" />
</div>
</template>

<script>
import { getBanners, getPoetrys } from '@/util/index'
import bottomNav from './BottomNav'
import appBar from './AppBar'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  components: {
    bottomNav,
    appBar
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
.list {
}
</style>
