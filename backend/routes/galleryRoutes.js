require('dotenv').config();

const express = require('express');
const multer = require('multer');
const router = express.Router();
const url = require('url');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
const fs = require('fs');

const {
    createGallery,
    getGallery,
} = require('../controllers/galleryController');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'backend/uploads/');
    },
    filename(req,file,callback) {
        callback(null, req.body.id);
    }
})

const upload = multer({storage: storage});

const BUCKET_URL = process.env.AWS_BUCKET_URL;

// router.route('/').get(getGallery);
router.route('/').get(function(req,res){
    // const {pathname} = url.parse(req.url, true)
    // res.redirect(`https://cors-anywhere.herokuapp.com/https://${BUCKET_URL}${pathname}`)
    const header = res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*")
    res.redirect(`https://${BUCKET_URL}/`);
})

router.route('/:imgId').get(function(req, res, next) {
    // let imgId  = url.parse(req.url, true);
    // var path = imgId.path;
    // const header = res.setHeader('Content-Type', 'application/json');
    // res.header("Access-Control-Allow-Origin", "*")

    let id  = req.params.imgId;

    // (https://talkit.tistory.com/580)
    var params = { Bucket: process.env.AWS_BUCKET_NAME, Key: id};
    var s3file = s3.getObject(params);

    console.log(s3file);
    // fs.readFile(`${id}`, function(err, data) {
        // res.writeHead(200, {"Content-type": "image/png"});
        // res.write(data);
    // });
    res.sendFile(process.cwd() + `/uploads/${id}`);

    // res.redirect(`https://${BUCKET_URL}/${id}`);
    res.redirect(`${BUCKET_URL}/${id}`);
})

router.route('/').post(upload.single('imageFile'), createGallery);

module.exports = router;