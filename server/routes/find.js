const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const ImageModel = require('../models/image.model');

// (https://intrepidgeeks.com/tutorial/confirm-member-inputduplicate-identity)
router.get('/', function(req, res, next) { // 조회하는 코드 작성
    const id = req.query.id;
    ImageModel.find(({id:id}),(err,img)=>{
        if(img[0]===undefined) { // 해당하는 id가 DB에 존재하지 않을 경우
            res.send("0")
        }
        else { // 해당하는 id가 DB에 존재할 경우
            res.send(img)
        }
    });
});

module.exports = router;