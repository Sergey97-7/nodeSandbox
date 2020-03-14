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
    image: {
        type: Buffer,
        contentType: String
    }
    // ,
    // test: {
    //     type: Blob
    // }
})
module.exports = model('Data', schema)