const { Schema, model } = require('mongoose');
const schema = new Schema({
    files: [{
        path: {
            type: String,
            required: true

        },
        name: {
            type: String,
            required: true
        },
        mimetype: {
            type: String,
            required: true
        }
    }]
})
module.exports = model('Files', schema)