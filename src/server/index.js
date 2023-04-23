const express = require('express')
const app = express()
const apiArray = require('./api')

apiArray.forEach(callback => {
  typeof callback == 'function' && callback(app)
})

app.listen(3000) // 服务端口在3000
