const router = require('express').Router()
const { auth } = require('../middleware/auth')
const { addQuestion, readQuestions, editQuestion, removeQuestion, addAnswer, updateAnswer, getMyQuestion, getOneQuestion, getOneAnswer, upVotes, downVote} = require('../controllers/controllerQuestions')

router.get('/', readQuestions)

router.get('/myquestions', auth, getMyQuestion)

router.post('/', auth, addQuestion)

router.put('/upVote/:id', auth, upVotes)

router.put('/dwnVote/:id', auth, downVote)

router.put('/update/:id', auth, editQuestion)

router.delete('/remove/:id', auth, removeQuestion)

router.get('/getOne/:id', auth, getOneQuestion)

router.get('/answer/:id', auth, getOneAnswer)

router.post('/answer/update/:id', auth, updateAnswer)

router.post('/answer/:id', auth, addAnswer)


module.exports = router