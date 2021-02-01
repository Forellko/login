const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const login_router = require('./routes/login_router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/login', login_router)

const PORT = 3000
app.listen(PORT, () => {
  console.log('port: ', PORT)
})

// axios
//   .get('http://localhost:3000/login')
//   .then((res) => {
//     console.log(res.status)
//   })
//   .catch((error) => {
//     console.log(error.message)
//   })

// axios
//   .get('http://localhost:3000/login/1', { name: 'Saito' })
//   .then((res) => {})
//   .catch(() => {})
