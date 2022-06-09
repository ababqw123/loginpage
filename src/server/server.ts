import express from 'express'
const app = express()
const port = 3000 // 포트번호 설정 
const ejs = require('ejs')
const path = require('path')

const loginRouter = require('./routers/login')
const mainRouter = require('./routers/main')
const usersRouter = require('./routers/users')

const __dirname_script = path.join(__dirname, '../script/')

app.set('view engine', 'ejs');

app.use('/script', express.static(__dirname_script))

app.use('/main',mainRouter) // /main으로 연결이 들어오면 mainRouter에게 보낸다 
app.use('/',loginRouter) // /으로 연결이 들어오면 loginRouter에게 보낸다
app.use('/users',usersRouter) // users으로 연결이 들어오면 usersRouter에게 보낸다 






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})