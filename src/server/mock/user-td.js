const Mock = require('mockjs')

const random = () => (Math.random() > 0.2 ? '1' : '0')
const getTableData = () => [
  {
    userName: '李二凤',
    phone: '13211111111',
    sex: Math.random() > 0.2 ? '1' : '0',
    deptName: '莲花一区A栋',
    deptId: '00101',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    userName: Mock.mock('@cname'),
    phone: '1' + Math.ceil(Math.random() * 6 + 3) + Mock.mock(/\d{9}/),
    sex: Math.random() > 0.2 ? '1' : '0',
    deptName: '莲花一区A栋',
    deptId: '00101',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    userName: Mock.mock('@cname'),
    phone: '1' + Math.ceil(Math.random() * 6 + 3) + Mock.mock(/\d{9}/),
    sex: Math.random() > 0.2 ? '1' : '0',
    deptName: '滨江小区A栋',
    deptId: '00201',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    userName: Mock.mock('@cname'),
    phone: '1' + Math.ceil(Math.random() * 6 + 3) + Mock.mock(/\d{9}/),
    sex: Math.random() > 0.2 ? '1' : '0',
    deptName: '阳光城小区B栋',
    deptId: '00302',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    userName: Mock.mock('@cname'),
    phone: '1' + Math.ceil(Math.random() * 6 + 3) + Mock.mock(/\d{9}/),
    sex: Math.random() > 0.2 ? '1' : '0',
    deptName: '科苑小区',
    deptId: '00402',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  }
]

module.exports = function (app) {
  app.post('/loadUsersInfo', (req, res) => {
    res.send({
      code: 0,
      data: getTableData(),
      msg: '查询成功'
    })
  })
}
