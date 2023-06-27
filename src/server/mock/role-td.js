const Mock = require('mockjs')

const getTableData = () => [
  {
    roleName: '系统管理员',
    roleVal: 'admin',
    status: '1',
    creatTime: Mock.mock('@datetime()'),
    remark: '-'
  },
  {
    roleName: '普通角色',
    roleVal: 'common',
    status: Math.random() > 0.2 ? '1' : '0',
    creatTime: Mock.mock('@datetime()'),
    remark: '-'
  }
]

module.exports = function (app) {
  app.post('/loadRolesInfo', (req, res) => {
    res.send({
      code: 0,
      data: getTableData(),
      msg: '查询成功'
    })
  })
}
