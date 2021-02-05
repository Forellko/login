const express = require('express')
const { User } = require('../models')
const db = require('../models/index')
const jwt = require('jsonwebtoken')

const onGetAuth = async (req, res) => {}

const onPostAuth = async (req, res) => {
  // debugger
  const userWithToken = await User.findOne({
    where: {
      token: req.body.token,
    },
  })
  try {
    jwt.verify(
      req.body.token,
      userWithToken.dataValues.createdAt.getTime().toString()
    )
    res.status(200).json({ isAccess: true })
  } catch (error) {
    res.status(300).json({ isAccess: false })
  }
}

module.exports = { onGetAuth, onPostAuth }
