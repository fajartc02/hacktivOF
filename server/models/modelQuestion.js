const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [
    {
      name: String,
      answer: String,
      date: Date,
      votes: Number
    }
  ],
  upVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downVotes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
  })

const Article = mongoose.model('Article', questionSchema)
module.exports = Article