const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const ImageSchema = mongoose.Schema({
    id : {
        type:String,
        require:true
    },
    image : {
        data:Buffer,
        contentType: String 
    }
})

module.exports = ImageModel = mongoose.model('imageModel', ImageSchema);