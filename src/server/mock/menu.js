const menus = [
  {
    id: 'muid_01000',
    icon: 'setting',
    name: '系统管理',
    component: '/layout',
    children: [
      {
        id: 'muid_01100',
        icon: 'user',
        name: '用户管理',
        path: '/user-manage',
        url: '/user-manage',
        children: []
      },
      {
        id: 'muid_01200',
        icon: 'role',
        name: '角色管理',
        path: '/role-manage',
        url: '/role-manage',
        children: []
      },
      {
        id: 'muid_01300',
        icon: 'menu',
        name: '菜单管理',
        path: '/menu-manage',
        url: '/menu-manage',
        children: []
      },
      {
        id: 'muid_01400',
        icon: 'dept',
        name: '部门管理',
        path: '/dept-manage',
        url: '/dept-manage',
        children: []
      }
    ]
  }
]

module.exports = function (app) {
  app.post('/getUserMenus', (req, res) => {
    res.send({
      code: 0,
      data: menus,
      msg: '操作成功'
    })
  })
}
