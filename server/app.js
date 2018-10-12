const Koa = require('koa')
const app = new Koa()
// const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const config = require('./config')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')

app.use(router.routes())

//设置静态资源的路径 
const staticPath = './static'

//加载静态文件
app.use(static(
  path.join(__dirname, staticPath)
))


// 启动程序，监听端口
app.listen(config.port)
