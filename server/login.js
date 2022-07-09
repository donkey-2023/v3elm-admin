export default function (server) {
  server.get('/login', (req, res) => {
    res.send({ name: 'ssd' })
  })
}
