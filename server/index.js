let express = require('express')
import loginService from './login'

let app = express();
loginService(app)


app.listen(3000)   // 服务端口在3000