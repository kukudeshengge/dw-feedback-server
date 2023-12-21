const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const datetime = require('silly-datetime')

const listPath = path.resolve(__dirname, '../data/list.json')
router.post('/save', function (req, res) {
  try {
    const { name, desc, fileList } = req.body
    const list = fs.readFileSync(listPath, 'utf-8')
    const newList = list ? JSON.parse(list) : []
    if (!desc || desc?.trim() === '') {
      return res.json({
        code: '500',
        message: '参数有误'
      })
    }
    const submitTime = datetime.format(new Date(), 'YYYY-MM-DD HH:mm')
    newList.push({ name, desc, fileList, submitTime })
    fs.writeFileSync(listPath, JSON.stringify(newList), 'utf-8')
    res.json({
      code: '200',
      message: '保存成功'
    })
  } catch (err) {
    res.json({
      code: '500',
      message: err.message
    })
    console.log(err)
  }
})

router.get('/clear', function (req, res) {
  if (!req.query.token) {
    return res.json({
      code: '401',
      token: '执行清除操作需携带token'
    })
  }
  if (req.query.token !== '15612868761') {
    return res.json({
      code: '401',
      token: 'token有误'
    })
  }
  fs.writeFileSync(listPath, JSON.stringify([]))
  res.json({
    code: '200',
    message: '清除成功'
  })
})
module.exports = router
