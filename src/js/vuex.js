import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerTitle: "",
    routerAn: "",
  },
  mutations: {
    _headerTitle(state, val){
      state.headerTitle = val;
    },
    _routerAn(state, val){
      state.routerAn = val;
    },
  },
})
