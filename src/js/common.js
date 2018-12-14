import Vue from 'vue'
import Vuex from 'vuex'
import store from '../js/vuex'
import router from '../router/index'
import axios from 'axios'

window.gl = {};

gl.data = {
  routerIsBack: true,
  userId: 1,
  bus: new Vue()
}

gl.methods = {
  setVueX(key, value) {
    store.commit(key, value);
  },
  setTitle(value) {
    this.setVueX("_headerTitle", value);
  },
  goPath(path, data = {}) {
    gl.data.routerIsBack = false;
    router.push({path: path, query: data});
  },
  alert(title = "提示", content = "",) {
    Vue.prototype.$createDialog({
      type: 'alert',
      title: title,
      content: content,
      onConfirm: () => {
        resolve(true);
      },
    }).show();
  },
  goBack(index = -1) {
    gl.data.routerIsBack = true;
    window.history.go(index);
  },
  //防抖
  deBounce(something, delay) {
    if (window.debounceF) clearTimeout(window.debounceF);
    window.debounceF = setTimeout(function () {
      something();
    }, delay);
  },
};

gl.ajax = {
  request(url, param, method = "get",) {

    let data = {
      method: method,
      url,
    };

    if (method == "post") {
      data.data = param;
    }
    else {
      data.params = param;
    }

    return new Promise((resolve) => {
      axios(data).then(res => {
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
