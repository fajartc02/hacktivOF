const User = require('../models/modelUser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  auth: function (req, res, next) {
    let decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    let isEmail = decode.email
    if (isEmail) {
      let isUser = {
        email: isEmail
      }
      User.findOne(isUser)
        .then(user => {
          req.userId = user._id
          next()
        })
        .catch(err => {
          res.status(400).json({
            message: 'Auth Fail',
            err: err.message
          })
        })
    }
  }
}