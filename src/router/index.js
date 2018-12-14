import Vue from 'vue'
import Router from 'vue-router'

const note = () => import('@/page/note/note.vue');
const addNote = () => import('@/page/note/addNote.vue');
const index = () => import('@/page/goods/index.vue');
const addGoods = () => import('@/page/goods/addGoods.vue');


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
    {

      path: '/note',
      component: note,
      children:[
        {
          path: '/note/addNote',
          component: addNote
        }
      ]
    },
  ]
})
