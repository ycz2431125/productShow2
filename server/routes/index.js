/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/td'
})

const demo = require('../controllers/demo')

// const index = require('../src/index.html')

router.get('/demo', demo)

// router.get('/index', index)

module.exports = router
