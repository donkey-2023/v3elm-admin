const Mock = require('mockjs')

module.exports = function (app) {
  app.post('/login', (req, res) => {
    res.send({
      code: 0,
      token: Mock.Random.guid(),
      msg: '操作成功'
    })
  })
}
