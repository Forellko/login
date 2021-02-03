const { User } = require('../models')
const db = require('../models/index')
const validator = require('validator')
const jwt = require('jsonwebtoken')
// const QI = db.sequelize.getQueryInterface()

const validationLogin = async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json()
  }

  // const testJWT = jwt.sign({ data: 5 }, 'secret', {
  //   expiresIn: 5,
  // })

  // setTimeout(() => {
  //   console.log(jwt.verify(testJWT, 'secret'))
  // }, 1000)

  // setTimeout(() => {
  //   console.log(jwt.verify(testJWT, 'secret'))
  // }, 6000)

  const { email, password, isSignIn, token } = req.body

  const result = await User.findAll()
  const usersDataBase = result.map((elm) => {
    return {
      email: elm.dataValues.email,
      password: elm.dataValues.password,
      id: elm.dataValues.id,
      token: elm.dataValues.token,
    }
  })

  let accountExist = usersDataBase.some(
    (elm) => email === elm.email && password === elm.password
  )

  if (!isSignIn && accountExist) {
    const currentUser = usersDataBase.find((user) => user.email === email)
    try {
      jwt.verify(currentUser.token)
      req.token = currentUser.token
    } catch (error) {}
  }

  // console.log(email)
  // console.log(password)

  // const token = jwt.sign({ foo: email }, 'shhh')
  // console.log(token)
  // const resultToken = jwt.verify(token, 'shhh')
  // console.log(resultToken)

  if (isSignIn && !accountExist) {
    const emailExist = usersDataBase.some((user) => user.email === email)
    if (emailExist) {
      return res.status(300).json()
    }
    const date = new Date()
    console.log(date.getTime().toString())
    const token = await jwt.sign({ email }, date.getTime().toString(), 10)
    req.token = token
    User.create({
      email: email,
      password: password,
      createdAt: date,
      updatedAt: date,
      token: token,
    })
    accountExist = true
  }

  req.accountExist = accountExist
  next()
}

module.exports = validationLogin
