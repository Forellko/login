const { sequelize } = require('./models/index')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const login_router = require('./routes/login_router')
const profile_router = require('./routes/profile_router')
const auth_router = require('./routes/auth_router')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/login', login_router)
app.use('/profile', profile_router)
app.use('/auth', auth_router)
app.use(express.static(path.resolve(__dirname, 'static')))

const PORT = 3000
app.listen(PORT, () => {
  console.log('port: ', PORT)
})

try {
  sequelize
    .authenticate()
    .then(console.log('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
