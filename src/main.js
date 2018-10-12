
import Vue from 'vue'
import './js/ajax'
import './js/common'
import store from './js/vuex'

import App from './App'
import router from './router'

import './scss/main.scss'

import {
  Style,
  Button,
  Loading,
  scrollNav,
  picker,
  sticky,
  actionSheet,
  form,
} from 'cube-ui'

Vue.use(Button)
Vue.use(Loading)
Vue.use(scrollNav)
Vue.use(sticky)
Vue.use(picker)
Vue.use(actionSheet)
Vue.use(form)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
