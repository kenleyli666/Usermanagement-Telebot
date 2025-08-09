const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        // required: true
    },
    answer: {
        type: String,
        // required: true
    }
});

const QuestionsCll = mongoose.model('Questions', QuestionSchema, 'questions');

module.exports = { QuestionsCll };