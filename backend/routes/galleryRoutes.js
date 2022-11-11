require('dotenv').config();

const express = require('express');
const multer = require('multer');
const router = express.Router();
const url = require('url');
const AWS = require('aws-sdk');

const {
    createGallery,
    getGallery,
} = require('../controllers/galleryController');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads');
    },
    filename(req,file,callback) {
        callback(null, req.body.id);
    }
})

const upload = multer({storage});

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
    const header = res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*")

    let id  = req.params.imgId;
    res.redirect(`https://${BUCKET_URL}/${id}`);

    console.log('here: ', id);
})

router.route('/').post(upload.single('imageFile'), createGallery);

module.exports = router;