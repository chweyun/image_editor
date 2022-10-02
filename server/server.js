require('dotenv').config();
const { PORT, MONGO_URI } = process.env;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
// const port = 8000;
const cors = require('cors'); 
const path = require('path');
app.use(cors());
const mime = require('mime-types');

const find = require('./routes/find');
// const router = require('./routes/find');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({limit: '3000kb'}));
app.use('/find', find);

mongoose
    .connect(
        MONGO_URI,
        { useNewUrlParser : true, useUnifiedTopology : true }
    )
    .then(() => console.log("db is connected"))
    .catch((err) => console.log(err, "it has an error"));

// storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req, file, cb) => {
        cb(null, `${mime.extension(file.mimetype)}`);
    },
});

const upload = multer({
    storage:Storage
}).single('image')



// (https://intrepidgeeks.com/tutorial/confirm-member-inputduplicate-identity)
// app.get('/find',async function(req, res, next) { // TODO 해당하는 id가 있으면 result 1, 없으면 result 0이 되도록 할 것
// res.send('heelo')
// });

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        console.log(req.body);
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                id : req.body.id,
                image : {
                    data: req.body.image, // TODO - req.file.filename 하면 에러남
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

app.listen(PORT, () => {
    console.log(`successfully running at http://localhost:${PORT}`);
});
