const express = require('express')
const db = require('../models/index')
const onGetLogin = (req, res) => {
  res.render('login_view')
}

const onPostLogin = (req, res) => {
  const QI = db.sequelize.getQueryInterface()
  QI.bulkInsert(
    'Users',
    [
      {
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  )
  console.log(req.body)
  return res.send(req.body)
}

module.exports = { onGetLogin, onPostLogin }
