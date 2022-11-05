module.exports = function (app, Random) {
  app.post('/login', (req, res) => {
    console.log('----req----', req)
    res.status(200)
    res.send({ code: 0, data: { toke: Random.guid() }, msg: '操作成功' })
  })
}
