const Mock = require('mockjs')

const random = () => (Math.random() > 0.2 ? '1' : '0')
const getTableData = () => [
  {
    id: Mock.Random.id(),
    order: 1,
    deptName: '莲花一区',
    status: random(),
    creatTime: Mock.mock('@datetime()'),
    children: [
      {
        id: Mock.Random.id(),
        order: 1,
        deptName: '莲花一区A栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      },
      {
        id: Mock.Random.id(),
        order: 2,
        deptName: '莲花一区B栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      }
    ]
  },
  {
    id: Mock.Random.id(),
    order: 2,
    deptName: '滨江小区',
    status: random(),
    creatTime: Mock.mock('@datetime()'),
    children: [
      {
        id: Mock.Random.id(),
        order: 1,
        deptName: '滨江小区A栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      },
      {
        id: Mock.Random.id(),
        order: 2,
        deptName: '滨江小区B栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      }
    ]
  },
  {
    id: Mock.Random.id(),
    order: 3,
    deptName: '阳光城小区',
    status: random(),
    creatTime: Mock.mock('@datetime()'),
    children: [
      {
        id: Mock.Random.id(),
        order: 1,
        deptName: '阳光城小区A栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      },
      {
        id: Mock.Random.id(),
        order: 2,
        deptName: '阳光城小区B栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      }
    ]
  },
  {
    id: Mock.Random.id(),
    order: 4,
    deptName: '科苑小区',
    status: random(),
    creatTime: Mock.mock('@datetime()'),
    children: [
      {
        id: Mock.Random.id(),
        order: 1,
        deptName: '科苑小区A栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      },
      {
        id: Mock.Random.id(),
        order: 2,
        deptName: '科苑小区B栋',
        status: random(),
        creatTime: Mock.mock('@datetime()')
      }
    ]
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
