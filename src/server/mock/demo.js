module.exports = function (app, Random) {
  app.get('/test', (req, res) => {
    res.send({ name: '测试nginx', province: Random.province() })
  })
}
