const User = require('../models/modelUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  getProfileUser: (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_KEY)
    let isTrue = {
      email: decode.email
    }
    User.findOne(isTrue)
    .then((result) => {
      res.status(200).json({
        message: 'Success to get user',
        data: result
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Failed to get',
        err: err.message
      })
    });
  },

  signin: (req, res) => {
    let isEmail = {
      email: req.body.email
    }
    User.findOne(isEmail)
      .then(user => {
        if(user) {
          let isTrue = bcrypt.compareSync(req.body.password, user.password)
          if (isTrue) {
            let token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_KEY)
            res.status(201).json({
              msg: 'Successfully to login',
              data: user,
              token: token
            })
          } else {
            res.status(500).json({
              msg: 'Your password wrong'
            })
          }
        } else {
          res.status(500).json({
            message: 'Your email wrong',
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed',
          err: err.message
        })
      })
  },

  signup: (req, res) => {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    User.create(newUser)
    .then(user => {
      res.status(201).json({
        message: 'Success',
        data: user
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed',
        err: err.message
      })
    })
  }
}