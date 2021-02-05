const express = require('express')
const db = require('../models/index')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const onGetVerify = async (req, res) => {}

const onPostVerify = async (req, res) => {
  const result = await User.findAll()
  const usersDataBase = result.map((elm) => {
    return {
      email: elm.dataValues.email,
      password: elm.dataValues.password,
      id: elm.dataValues.id,
      token: elm.dataValues.token,
      refreshToken: elm.dataValues.tokenRefresh,
      createdAt: elm.dataValues.createdAt,
    }
  })

  const currentUser = usersDataBase.find(
    (user) => user.refreshToken === req.body.refreshToken
  )
  try {
    const loginToken = jwt.sign(
      { email: currentUser.email },
      currentUser.createdAt.getTime().toString(),
      {
        expiresIn: 10,
      }
    )
    const loginRefreshToken = jwt.sign(
      { email: currentUser.email },
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
          email: currentUser.email,
        },
      }
    )
    res.status(200).json({
      isAccess: true,
      accessToken: loginToken,
      refreshToken: loginRefreshToken,
    })
  } catch (error) {
    console.log(error.message)
    res.status(301).json({ isAccess: false })
  }
}

module.exports = { onGetVerify, onPostVerify }
