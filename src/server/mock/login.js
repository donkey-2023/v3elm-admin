const routes = [
  {
    id: 1,
    icon: 'icon-jurassic_user',
    name: '用户管理',
    url: '/user'
  },
  {
    id: 2,
    icon: 'icon-jurassic_user',
    name: '角色管理',
    url: '/role'
  },
  {
    id: 3,
    icon: 'icon-shebei',
    name: '设备管理',
    url: '/device'
  }
]

module.exports = function (app, Random) {
  app.post('/login', (req, res) => {
    // res.status(200)
    res.send({
      code: 0,
      data: {
        token: Random.guid(),
        routes
      },
      msg: '操作成功'
    })
  })
}
