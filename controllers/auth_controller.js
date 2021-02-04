const express = require('express')
const jwt = require('jsonwebtoken')

const onGetAuth = async (req, res) => {}

const onPostAuth = (req, res) => {
  console.log(req.body)
}

module.exports = { onGetAuth, onPostAuth }
