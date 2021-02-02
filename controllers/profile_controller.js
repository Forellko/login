const express = require('express')
const db = require('../models/index')
const QI = db.sequelize.getQueryInterface()

const onGetProfile = async (req, res) => {
  res.render('profile_view')
}

const onPostProfile = (req, res) => {}

module.exports = { onGetProfile, onPostProfile }
