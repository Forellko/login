const express = require('express')
const db = require('../models/index')
const QI = db.sequelize.getQueryInterface()

const onGetLogin = async (req, res) => {
  res.render('login_view')
}

const onPostLogin = (req, res) => {
  req.ok ? res.render('profile_view') : res.status(404).render('login_view')
}

module.exports = { onGetLogin, onPostLogin }
