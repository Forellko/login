const { User } = require('../models')
const db = require('../models/index')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const validationLogin = async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json()
  }

  const { email, password, isSignIn } = req.body

  const result = await User.findAll()
  const usersDataBase = result.map((elm) => {
    return {
      email: elm.dataValues.email,
      password: elm.dataValues.password,
      id: elm.dataValues.id,
      token: elm.dataValues.token,
      createdAt: elm.dataValues.createdAt,
    }
  })

  let accountExist = usersDataBase.some(
    (elm) => email === elm.email && password === elm.password
  )

  if (!isSignIn && accountExist) {
    const currentUser = usersDataBase.find((user) => user.email === email)
    try {
      const loginToken = jwt.sign(
        { email },
        currentUser.createdAt.getTime().toString(),
        {
          expiresIn: 10,
        }
      )
      const loginRefreshToken = jwt.sign(
        { email },
        currentUser.createdAt.getTime().toString(),
        {
          expiresIn: 500,
        }
      )
      User.update(
        {
          token: loginToken,
          tokenRefresh: loginRefreshToken,
        },
        {
          where: {
            email: email,
          },
        }
      )
      req.token = loginToken
      req.refreshToken = loginRefreshToken
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isSignIn && !accountExist) {
    const emailExist = usersDataBase.some((user) => user.email === email)
    if (emailExist) {
      return res.status(300).json()
    }
    const date = new Date()
    const token = await jwt.sign({ email }, date.getTime().toString(), {
      expiresIn: 10,
    })
    const refreshToken = await jwt.sign({ email }, date.getTime().toString(), {
      expiresIn: 500,
    })
    req.token = token
    req.refreshToken = refreshToken
    User.create({
      email: email,
      password: password,
      createdAt: date,
      updatedAt: date,
      token: token,
      refreshToken: refreshToken,
    })
    accountExist = true
  }

  req.accountExist = accountExist
  next()
}

module.exports = validationLogin
