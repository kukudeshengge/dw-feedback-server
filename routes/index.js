const express = require('express')
const router = express.Router()
const mongodb = require('../db/mongodb')

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const db = await mongodb()
    const list = await db.collection('feedBack').find({}).toArray()
    list.forEach(item => {
      item.fileList = JSON.parse(item.fileList)
    })
    res.render('index', {
      title: '洞窝小工具意见反馈',
      list: list.reverse()
    })
  } catch (err) {
    console.log(err, 'router get / error')
  }
})

module.exports = router
