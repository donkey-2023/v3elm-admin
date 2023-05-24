const Mock = require('mockjs')

const random = () => (Math.random() > 0.2 ? '1' : '0')
const getTableData = () => [
  {
    id: Mock.Random.id(),
    deptName: '莲花社区',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    id: Mock.Random.id(),
    deptName: '滨江社区',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    id: Mock.Random.id(),
    deptName: '快乐城社区',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  },
  {
    id: Mock.Random.id(),
    deptName: '城市广场社区',
    status: random(),
    creatTime: Mock.mock('@datetime()')
  }
]

module.exports = function (app) {
  app.post('/queryDeptInfo', (req, res) => {
    res.send({
      code: 0,
      data: getTableData(),
      msg: '查询成功'
    })
  })
}
