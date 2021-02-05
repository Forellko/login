const express = require('express')
const db = require('../models/index')
const QI = db.sequelize.getQueryInterface()

const onGetLogin = async (req, res) => {
  res.render('login_view')
}

const onPostLogin = (req, res) => {
  res.status(200).json({
    accountExist: req.accountExist,
    token: req.token,
    refreshToken: req.refreshToken,
  })
}

module.exports = { onGetLogin, onPostLogin }
