const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const listPath = path.resolve(__dirname, '../data/list.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  const list = fs.readFileSync(listPath, 'utf-8')
  res.render('index', {
    title: '洞窝小工具意见反馈',
    list: list ? JSON.parse(list) : []
  })
})

module.exports = router
