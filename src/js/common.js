import Vue from 'vue'
import Vuex from 'vuex'
import store from '../js/vuex'
import router from '../router/index'
import axios from 'axios'

window.gl = {};

gl.methods = {
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

gl.ajax = {
  request(url, param, method = "get",){
    return new Promise((resolve) => {
      axios({
        method: method,
        url,
        params: param,
      }).then(res => {
        let rd = res.data;
        if (rd) {
          if (rd.code == 1) {
            resolve(rd)
          } else {
            // _methods.mes(rd.msg,2,false,1);
          }
        }
      })
    })
  }
};
