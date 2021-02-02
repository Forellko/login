const { User } = require('../models')
const db = require('../models/index')
const validator = require('validator')
const jwt = require('jsonwebtoken')
// const QI = db.sequelize.getQueryInterface()

const validationLogin = async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json()
  }

  const { email, password, isSignIn } = req.body

  const result = await User.findAll()
  const emailsAndPasswords = result.map((elm) => {
    return {
      email: elm.dataValues.email,
      password: elm.dataValues.password,
      id: elm.dataValues.id,
    }
  })
  let accountExist = emailsAndPasswords.some(
    (elm) => email === elm.email && password === elm.password
  )

  // if (req.body.log_in) {
  // }
  // console.log(email)
  // console.log(password)

  // const token = jwt.sign({ foo: email }, 'shhh')
  // console.log(token)
  // const resultToken = jwt.verify(token, 'shhh')
  // console.log(resultToken)

  if (isSignIn && !accountExist) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    accountExist = true
  }

  req.accountExist = accountExist
  next()
}

module.exports = validationLogin
