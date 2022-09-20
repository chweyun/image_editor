// var express = require("express");
// var router = express.Router();
// var posts = require("../database/model"); // 스키마 불러오기

// // Create
// router.post("/", function(req, res, next) {
//     const { id, image } = req.body; // 비구조화 할당

//     console.log(req.body);

//     var postModel = new posts();
//     postModel.id = id;
//     postModel.image = image;
//     postModel
//         .save()
//         .then(newPost => {
//             console.log("Create 완료");
//             res.status(200).json({
//                 message: "Create success",
//                 data: {
//                     post: newPost
//                 }
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: err
//             });
//         });
// });

// module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const Image = require("./database/imageModel.js");

// // router.get('/', async (req, res) => {
// //     res.send('hihi');
// //     // try {
// //     //     const images = await Image.find();
// //     //     res.json(images);
// //     // } catch (err) {
// //     //     res.status(500).json({ message: err.message });
// //     // }
// // });

// // router.get('/image', (req,res) => {
// //     res.send('프로젝트 불러오기')
// // });

// // router.post('/image', async (req, res) => {
// //     const image = new Image({
// //         id: req.body.id,
// //         image: req.body.image,
// //     });
// //     try {
// //         const newImages = await image.save();
// //         res.status(201).json(newImages);
// //     } catch (err) {
// //         res.status(400).json({ message: err.message });
// //     }
// // });

// // // id값을 통해 프로젝트를 불러오는 function
// // async function getId(req, res, next) {
// //     let image;
// //     try {
// //         image = await Image.findById(req.params.id);
// //         if (image == null) {
// //             return res.status(404).json({ message: "해당하는 id값을 찾을 수 없습니다." });
// //         }
// //     } catch (err) {
// //         return res.status(500).json({ message: err.message });
// //     }
// //     res.image = image;
// //     next();
// // }

// // module.exports = router;