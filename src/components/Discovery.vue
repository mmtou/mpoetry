<template>
<div class="discovery">
  <!-- app bar -->
  <app-bar @search="search"/>

  <!-- banner -->
  <mu-carousel class="banner" hide-controls>
    <mu-carousel-item v-for="(item, index) in banners" :key="index">
      <img :src="item.imageUrl">
    </mu-carousel-item>
  </mu-carousel>

  <!-- poetry list -->
  <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" :loaded-all="loadedAll" @load="load" class="load-more">
    <mu-list textline="two-line">
      <div v-for="(item, index) in contents" :key="item.id">
        <mu-list-item button avatar :to="'poetryDetail?id=' + item.id">
          <mu-list-item-action>
            <mu-avatar color="grey900">
              {{getAvatarName(item.authorName)}}
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{item.title}}</mu-list-item-title>
            <mu-list-item-sub-title>
              {{item.content}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <div class="item-tips">
          <mu-button flat color="grey700">{{item.date}}</mu-button>
          <mu-button flat>
            <mu-icon size="12" value="comment" color="grey700"></mu-icon>&nbsp;{{item.commentCount === 0 ? '' : item.commentCount}}
          </mu-button>
          <mu-button flat>
            <mu-icon size="12" value="thumb_up" color="grey700"></mu-icon>&nbsp;{{item.likeCount === 0 ? '' : item.likeCount}}
          </mu-button>
          <mu-divider></mu-divider>
        </div>
      </div>
    </mu-list>
  </mu-load-more>
  <bottom-nav value="discovery"/>
</div>
</template>

<script>
import { getBanners, getPoetrys } from '@/util/index'
import bottomNav from './BottomNav'
import appBar from './AppBar'

export default {
  data() {
    return {
      userInfo: {},
      banners: [
      ],
      contents: [
      ],
      pageNo: 1,
      refreshing: true,
      loading: false,
      loadedAll: false,
      keyword: ''
    }
  },
  components: {
    bottomNav,
    appBar
  },
  methods: {
    getAvatarName(name) {
      if (name) {
        return name.substring(0, 1);
      }
      return '诗';
    },
    search(keyword) {
      this.keyword = keyword;
      this.refreshing = true;
      this.pageNo = 1;
      this.contents = [];
      this.queryPoetry();
    },
    refresh() {
      this.refreshing = true;
      this.pageNo = 1;
      this.contents = [];
      this.queryPoetry();
    },
    load() {
      this.loading = true;
      this.pageNo += 1;
      this.queryPoetry();
    },
    queryPoetry() {
      let param = {
        'page.pageNo': this.pageNo,
        'orderField': 1,
        'keyword': this.keyword
      };
      this.$get('/api/poetry/list', param).then((response) => {
        this.refreshing = false;
        this.loading = false;

        let contents = response.result;
        if (contents && contents.length > 0) {
          this.contents = this.contents.concat(contents);
        } else {
          this.loadedAll = true;
        }
      });
    }
  },
  mounted() {
    this.$get('/api/banner/list').then((response) => {
      this.banners = response.result;
    });
    this.queryPoetry(1);
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  height: 10.71rem;
}
.banner img {
  width: 100%;
  height: 100%;
}
.load-more {
  margin-bottom: 4rem;
}
</style>
