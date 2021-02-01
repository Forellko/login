const { User } = require('../models')
const db = require('../models/index')
const validator = require('validator')
// const QI = db.sequelize.getQueryInterface()

const validationLogin = async (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    next()
    return
  }
  const result = await User.findAll()
  const emailsAndPasswords = result.map((elm) => {
    return {
      email: elm.dataValues.email,
      password: elm.dataValues.password,
    }
  })
  let accountExist = emailsAndPasswords.some(
    (elm) => req.body.email === elm.email && req.body.password === elm.password
  )

  // if (req.body.log_in) {
  // }

  console.log(accountExist)
  console.log(req.body)
  if (req.body.sign_in && !accountExist) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    accountExist = true
  }

  req.ok = accountExist
  next()
}

module.exports = validationLogin
