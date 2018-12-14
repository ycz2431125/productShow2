/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/td'
})

const demo = require('../controllers/demo')
const addNote = require('../controllers/addNote')
const getNoteList = require('../controllers/getNoteList')


// const index = require('../src/index.html') //静态文件读取

router.get('/demo', demo)

router.get('/getNoteList', getNoteList)

router.post('/addNote', addNote)


module.exports = router
