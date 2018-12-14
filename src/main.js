import Vue from 'vue'
import store from './js/vuex'
import App from './App'
import router from './router'

import './scss/main.scss'

import Cube from 'cube-ui'

Vue.use(Cube)

Vue.config.productionTip = false

import './js/ajax'
import './js/common'

// router.beforeEach((to, from, next) => {
//   if (gl.data.routerIsBack) {
//     store.commit("_routerAn","pageSlideRight");
//   }
//   else {
//     store.commit("_routerAn","pageSlideLeft");
//     gl.data.routerIsBack = true;
//   }
//   next();
// });

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
