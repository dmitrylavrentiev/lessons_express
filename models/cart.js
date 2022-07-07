const { Schema, model } = require('mongoose')

const cart = new Schema({
    id: {
        type: String,
        required: true
    }
})

module.exports = model('Cart', cart)