const Question = require('../models/modelQuestion')
const jwt = require('jsonwebtoken')
const User = require('../models/modelUser')

module.exports = {
  addQuestion: (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_KEY)
    if (decode) {
      let newQuestion = {
        title: req.body.title,
        description: req.body.description,
        UserId: decode.id,
        votes: 0
      }

      Question.create(newQuestion)
        .then((result) => {
          res.status(201).json({
            message: 'Success add Q',
            data: result
          })
        }).catch((err) => {
          res.status(500).json({
            message: 'Failed add Q',
            err: err.message
          })
        });
    } else {
      res.status(400).json({
        message: 'Not Auth'
      })
    }
  },

  getOneQuestion: (req, res) => {
    let idQuest = {
      _id: req.params.id
    }
    Question.findOne(idQuest)
      .populate('UserId')
      .then(question => {
        res.status(201).json({
          message: 'Success get question',
          data: question
        })

      })
      .catch(err => {
        res.status(500).json({
          message: 'Fail',
          err: err.message
        })
      })
  },

  getMyQuestion: (req, res) => {
    let decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    let idUser = {
      UserId: decode.id
    }
    Question.find(idUser)
      .then(questions => {
        res.status(200).json({
          message: 'Success get questions',
          data: questions
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed get article',
          err: err.message
        })
      })
  },

  voteQuestion: (req, res) => {
    let id = {
      _id: req.params.id
    }
    console.log(req.body)
    Question.findOne(id)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      });
  },

  readQuestions: (req, res) => {
    Question.find({})
      .populate('UserId')
      .then((result) => {
        res.status(200).json({
          message: 'Succeess get questions',
          data: result
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Failed get question',
          err: err.message
        })
      });
  },

  upVotes: (req, res) => {
    let id = { // id questions
      _id: req.params.id
    }
    Question.findOne(id)
      .then(result => {
        let voteUpTrue = result.downVotes.indexOf(req.userId)
        let isTrue = result.upVotes.indexOf(req.userId)
        if (isTrue === -1) {
          if (voteUpTrue !== -1) {
            Question.updateOne(id, {
                $pull: {
                  downVotes: req.userId
                }
              })
              .then((result) => {
                res.status(201).json({
                  message: 'Success',
                  data: result
                })
              })
              .catch((err) => {
                res.status(500).json({
                  message: 'fail',
                  err: err.message
                })
              })
          }
          Question.updateOne(id, {
              $push: {
                upVotes: req.userId
              }
            })
            .then((result) => {
              res.status(201).json({
                message: 'Success',
                data: result
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: 'fail',
                err: err.message
              })
            })
        } else {
          res.status(404).json({
            message: 'You cannot duplicate vote',
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

  downVote: (req, res) => {
    let id = { // id questions
      _id: req.params.id
    }
    Question.findOne(id)
      .then(result => {
        let isTrue = result.downVotes.indexOf(req.userId)
        let voteUpTrue = result.upVotes.indexOf(req.userId)
        console.log(isTrue)
        if (isTrue === -1) {
          if (voteUpTrue !== -1) {
            Question.updateOne(id, {
                $pull: {
                  upVotes: req.userId
                }
              })
              .then((result) => {
                res.status(201).json({
                  message: 'Success',
                  data: result
                })
              })
              .catch((err) => {
                res.status(500).json({
                  message: 'fail',
                  err: err.message
                })
              })
          }
          Question.updateOne(id, {
              $push: {
                downVotes: req.userId
              }
            })
            .then((result) => {
              res.status(201).json({
                message: 'Success',
                data: result
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: 'fail',
                err: err.message
              })
            })
        } else {
          res.status(401).json({
            message: 'You cannot duplicate vote',
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

  editQuestion: (req, res) => {
    let id = {
      _id: req.params.id
    }
    Question.findOne(id)
      .then((question) => {
        let updatedQuestion = {
          title: req.body.title || question.title,
          description: req.body.description || question.description,
          votes: req.body.votes || question.votes
        }
        let userId = String(req.userId)
        let userQuestId = String(question.UserId)
        if (userId === userQuestId) {
          Question.updateOne(id, {
              $set: updatedQuestion
            })
            .then((result) => {
              res.status(201).json({
                message: 'Success to update',
                data: result,
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: 'failed to update',
                err: err.message
              })
            })
        } else {
          res.status(400).json({
            message: 'You cannot delete this'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message: 'You not have auth',
          err: err.message
        })
      })
  },

  removeQuestion: (req, res) => {
    let id = {
      _id: req.params.id
    }
    Question.findOne(id)
      .then((question) => {
        let userId = String(req.userId)
        let userQuestId = String(question.UserId._id)
        if (userId === userQuestId) {
          Question.remove(id)
            .then((result) => {
              res.status(201).json({
                message: 'Success to update',
                data: result,
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: 'failed to update',
                err: err.message
              })
            })
        } else {
          res.status(400).json({
            message: 'You cannot delete this'
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Failed',
          err: err.message
        })
      });
  },

  addAnswer: (req, res) => {
    let id = {
      _id: req.params.id
    }
    let decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    let answerUser = {
      name: decode.name,
      userId: decode.id,
      answer: req.body.answer,
      date: new Date()
    }
    Question.updateOne(id, {
        $push: {
          answers: answerUser
        }
      })
      .then((result) => {
        res.status(201).json({
          message: 'Success to add answer',
          data: result
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Failed to add answer',
          err: err.message
        })
      })
  },

  getOneAnswer: (req, res) => {
    // console.log(req.query.idQ); // id Ques
    // console.log(req.params.id); // id Ans
    let id = {
      answers: {
        _id: req.params.id
      }
    }
    Question.findOne({
        'answers._id': {
          _id: req.params.id
        }
      })
      .then((result) => {
        // console.log(result.answers);
        result.answers.forEach(answer => {
          if (String(answer._id) == String(req.params.id)) {
            res.status(200).json({
              message: 'Success Find Answer',
              data: answer
            })
          }
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Fail',
          err: err.message
        })
      });
  },

  updateAnswer: (req, res) => {
    let id = {
      'answers._id': req.params.id
    }
    console.log(req.body)
    Question.findOne(id)
      .then((question) => {
        question.answers.forEach(answer => {
          if (String(answer._id) == String(req.params.id)) {
            Question.update(id, {
                $set: {
                  answers: req.body
                }
              })
              .then((result) => {
                res.status(201).json({
                  message: 'Success to post answer',
                  data: result
                })
              })
              .catch((err) => {
                res.status(500).json({
                  message: 'Failed',
                  err: err.message
                })
              })
          }
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Fail',
          err: err.message
        })
      });
  }
}