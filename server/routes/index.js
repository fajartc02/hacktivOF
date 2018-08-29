var express = require('express');
var router = express.Router();
const { signin, signup } = require('../controllers/controllerUsers')
const questions = require('./questions')

router.post('/signin', signin)
router.post('/signup', signup)

router.use('/questions', questions)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router;
