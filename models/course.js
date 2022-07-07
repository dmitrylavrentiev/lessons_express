const { Schema, model } = require('mongoose')

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

module.exports = model('Course', course)