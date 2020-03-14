const { Schema, model } = require('mongoose');
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    description: {
        type: String
    }
})
module.exports = model('Users', schema)