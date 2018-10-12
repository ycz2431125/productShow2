import axios from 'axios'
// import qs from 'qs'

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = '/td'

//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
};

axios.defaults.timeout = 30000;

//请求拦截器
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, err => {
  let errMes;

  if (err.response && err.response.path){
    errMes = err.response.data;
  }else {
    errMes = {
      status:err.response.status,
      path:err.response.data,
    };
  }

  _methods.notify(errMes.path,
    3,
    {
      title:errMes.status,
      duration:0,
    });

  return Promise.resolve(err);
});

global.ajax = {};

global.ajax.request = (url, param, method = "get",) => {
  return new Promise((resolve) => {
    axios({
      method: method,
      url,
      params: param,
      cancelToken: new CancelToken(c => {
        cancel = c
      })
    }).then(res => {
      let rd = res.data;
      if (rd){
        if (rd.code == 1){
          resolve(rd)
        }else {
          _methods.mes(rd.msg,2,false,1);
        }
      }
    })
  })

};

// window._ajax.loading = (url, param, method = "get")=>{
//   _methods.loading.show();
//   return new Promise((resolve)=>{
//     _ajax.request(url, param, method).then((d)=>{
//       _methods.loading.close();
//       resolve(d);
//     })
//   });
// };


