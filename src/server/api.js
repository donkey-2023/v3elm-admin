const fs = require('fs')
const { join } = require('path')

const mocks = []
console.log('----__dirname----', __dirname)
const files = fs.readdirSync(__dirname + '/mock')
console.log('----files----', files)

files.forEach(fileName => {
  const path = join(__dirname + '/mock', fileName)
  const api = require(path)
  mocks.push(api)
})

module.exports = mocks
