import Vue from 'vue'
import Router from 'vue-router'
import Discovery from '@/components/Discovery'
import PoetryDetail from '@/components/PoetryDetail'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Discovery',
      component: Discovery
    },
    {
      path: '/poetryDetail',
      name: 'PoetryDetail',
      component: PoetryDetail
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
