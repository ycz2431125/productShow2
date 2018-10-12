import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerTitle: "",
  },
  mutations: {
    _headerTitle(state, val){
      state.headerTitle = val;
    },
  },
})
