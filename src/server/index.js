const express = require('express')
const app = express()
const apiArray = require('./api')
const Mock = require('mockjs')
const Random = Mock.Random

apiArray.forEach(callback => {
  typeof callback == 'function' && callback(app, Random)
})

app.listen(3000) // 服务端口在3000
