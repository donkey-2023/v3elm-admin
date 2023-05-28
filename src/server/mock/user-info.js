const Mock = require('mockjs')

Mock.Random.extend({
  phone() {
    return '1' + Math.ceil(Math.random() * 6 + 3) + Mock.mock(/\d{9}/)
  }
})

const userInfo = Mock.mock({
  name: '@cname',
  birthday: '@date',
  ip: '@ip',
  email: '@email(163.com)',
  county: '@county(true)'
})

module.exports = function (app) {
  app.post('/getUserInfo', (req, res) => {
    res.send({
      code: 0,
      user: {
        sex: Math.random() > 0.2 ? 1 : 0,
        phone: Mock.Random.phone(),
        ...userInfo
      },
      msg: '操作成功'
    })
  })
}
