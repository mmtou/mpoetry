<template>
<div class="detail">
  <mu-appbar color="primary">
    <mu-button icon slot="left" to="/">
      <mu-icon value="arrow_back"></mu-icon>
    </mu-button>
    {{detail.title}}
  </mu-appbar>

  <!-- 内容区 -->
  <mu-card class="content">
    <mu-card-title :title="detail.title" :sub-title="detail.author"></mu-card-title>
    <mu-card-text v-html="compiledMarkdown(detail.content)">
    </mu-card-text>
    <mu-card-actions>
      <mu-button flat>
        <mu-icon size="24" value="thumb_up" color="grey700"></mu-icon>&nbsp;
        {{detail.likeCount}}
      </mu-button>
      <mu-button flat>
        <mu-icon size="24" value="share" color="grey700"></mu-icon>
      </mu-button>
    </mu-card-actions>
  </mu-card>

  <!-- 评论区 -->
  <mu-list textline="three-line" class="comments">
    <mu-sub-header>评论区({{detail.commentCount || 0}})</mu-sub-header>
    <div v-for="(item, index) in comments" :key="item.id">
      <mu-list-item button avatar>
        <mu-list-item-action>
          <mu-avatar>
            <img :src="'/upload/avatar/' + item.userId + '.png'">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{item.userName}}</mu-list-item-title>
          <mu-list-item-sub-title>
            {{item.content}}
          </mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-list-item-after-text>{{item.time}}</mu-list-item-after-text>
          <mu-icon value="thumb_up"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </div>
  </mu-list>

  <div class="comment-input">
    <input type="text" v-model:value="comment">
    <input type="button" value="发送" @click="send">
  </div>

  <div class="mask" v-if="loading">
    <mu-circular-progress :size="48" color="red500"></mu-circular-progress>
  </div>
</div>
</template>

<script>
import { getPoetryDetail, getComments, formatTime, formatCount } from '@/util/index';
import marked from 'marked';

// 主体类型: 1poetry; 2author
const SUBJECT_TYPE = 1;

export default {
  data() {
    return {
      detail: {},
      comments: [],
      like: false,
      comment: '',
      loading: true,
      id: ''
    }
  },
  components: {
  },
  methods: {
    compiledMarkdown(source) {
      source = source || '';
      source = source.replace(/\n/g, '\n\r  ');
      return marked(source, { sanitize: true })
    },
    formatCount(count) {
      return formatCount(count);
    },
    queryComments() {
      this.$get('/api/comment/list', {
        subjectType: 1,
        subjectId: this.id
      }).then((response) => {
        this.comments = response.result;
      });
    },
    doLike() {
      this.like = true;
    },
    send() {
      if (this.comment) {
        let param = {
        	subjectId: this.id,
        	subjectType: SUBJECT_TYPE,
        	content: this.comment
        };

        // 清空输入框
        this.comment = '';

        this.$post('/api/comment/add', param).then((response) => {
          this.queryComments();
        });
      }
    },
    reply(userName) {
      this.comment = '@' + userName + ' ';
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$get('/api/poetry/' + this.id).then((response) => {
      this.detail = response.result;
      this.loading = false;
    });

    this.queryComments();
  }
}
</script>

<style scoped>
.content {
  text-align: center;
}
.thumb {
  color: #888;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.comments {
  margin-bottom: 56px;
}
.comment-input {
  position: fixed;
  border-top: 1px solid #CCC;
  bottom: 0;
  left: 0;
  right: 0;
  padding: .16rem;
  margin: 0;
  display: flex;
  height: 42px;
}
.comment-input input {
  padding: 0;
  margin: 0;
  border: 0;
  outline-style: none;
  display: block;
}
.comment-input input[type=text] {
  flex: 1;
  padding: .16rem;
}
.comment-input input[type=button] {
  width:42px;
  height: 100%;
  background: #FFF;
}
</style>
