const express = require('express')

const onGetLogin = (req, res) => {
  res.render('login_view')
}

const onPostLogin = (req, res) => {
  console.log(req.body)
  return res.send(req.body)
}

module.exports = { onGetLogin, onPostLogin }
