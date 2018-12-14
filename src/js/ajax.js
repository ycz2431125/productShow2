import axios from 'axios'

let cancel, promiseArr = {}

axios.defaults.baseURL = '/td'

// //设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// };

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

  if (err.response && err.response.path) {
    errMes = err.response.data;
  } else {
    errMes = {
      status: err.response.status,
      path: err.response.data,
    };
  }

  console.log({
    title: errMes.status,
    duration: 0,
  });

  return Promise.resolve(err);
});




