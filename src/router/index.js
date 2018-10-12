import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import addGoods from '@/page/addGoods/addGoods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path: '/index/addGoods',
          component: addGoods
        }
      ]
    },
  ]
})
