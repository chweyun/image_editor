const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema 생성
const postSchema = new Schema({
    id : String,
    image : String
});

module.exports = mongoose.model('model', postSchema);