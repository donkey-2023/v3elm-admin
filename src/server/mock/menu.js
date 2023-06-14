const Mock = require('mockjs')
const random = () => (Math.random() > 0.2 ? '1' : '0')
const menus = [
  {
    id: 'muid_01000',
    order: 1,
    icon: 'setting',
    name: '系统管理',
    status: '1',
    creatTime: Mock.mock('@datetime()'),
    children: [
      {
        id: 'muid_01100',
        order: 1,
        icon: 'user',
        name: '用户管理',
        path: '/system-manage/user-manage',
        auth: 'page:userManage',
        url: '/system-manage/user-manage',
        status: random(),
        creatTime: Mock.mock('@datetime()'),
        children: []
      },
      {
        id: 'muid_01200',
        order: 2,
        icon: 'role',
        name: '角色管理',
        path: '/system-manage/role-manage',
        auth: 'page:roleManage',
        url: '/system-manage/role-manage',
        status: random(),
        creatTime: Mock.mock('@datetime()'),
        children: []
      },
      {
        id: 'muid_01300',
        order: 3,
        icon: 'menu',
        name: '菜单管理',
        path: '/system-manage/menu-manage',
        auth: 'page:menuManage',
        url: '/system-manage/menu-manage',
        status: random(),
        creatTime: Mock.mock('@datetime()'),
        children: []
      },
      {
        id: 'muid_01400',
        order: 4,
        icon: 'dept',
        name: '部门管理',
        path: '/system-manage/dept-manage',
        auth: 'page:deptManage',
        url: '/system-manage/dept-manage',
        status: random(),
        creatTime: Mock.mock('@datetime()'),
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
