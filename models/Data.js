const { Schema, model } = require('mongoose');
const schema = new Schema({
    text: {
        type: Buffer,
        contentType: String
    },
    pdf: {
        type: Buffer,
        contentType: String
    },
    img: {
        type: Buffer,
        contentType: String
    }
})
module.exports = model('Data', schema)