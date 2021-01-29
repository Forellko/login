const express = require('express')

const onGetLogin = (req, res) => {
  res.render('login_view_test')
}

const onPostLogin = (req, res) => {
  console.log(req.body)
  return res.send('text')
}

module.exports = { onGetLogin, onPostLogin }
