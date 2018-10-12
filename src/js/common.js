import Vue from 'vue'
import Vuex from 'vuex'
import store from '../js/vuex'
import router from '../router/index'

window.dataGloble = {};

window.methodsGloble = {
  setVueX(key, value) {
    store.commit(key, value);
  },
  setTitle(value) {
    this.setVueX("_headerTitle", value);
  },
  goPath(path, data = {}) {
    router.push({path: path, query: data});
  }
};

