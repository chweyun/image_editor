const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const port = 8000;
const cors = require('cors'); 
const path = require('path');
app.use(cors());
const ImageModel = require('./image.model');
const mime = require('mime-types');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({limit: '3000kb'}));

mongoose
    .connect(
        "mongodb+srv://choiyun:0918@image-editor.feps7kn.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser : true, useUnifiedTopology : true }
    )
    .then(() => console.log("db is connected"))
    .catch((err) => console.log(err, "it has an error"));

// storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req, file, cb) => {
        // cb(null, `${mime.extension(file.mimetype)}`);
        cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage:Storage
}).single('image')

app.get('/find',(req, res) => {
    // ImageModel.findById("632f01607002b14621d5823d", function(err, result) {
    //     if (err) {
    //         res.send(err);
    //     } else {
    //         res.json(result);
    //     }
    // });
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                id : req.body.id,
                image : {
                    data: req.file, // TODO - req.file.filename 하면 에러남
                    contentType: 'image/png'
                }
            })
            newImage
                .save()
                .then(()=> res.send('successfully uploaded'))
                .catch(err=> console.log(err))
        }
    })
});

app.listen(port, () => {
    console.log(`successfully running at http://localhost:${port}`);
});
