const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors');

var db;
var mongoURI = "mongodb+srv://choiyun:0918@image-editor.feps7kn.mongodb.net/?retryWrites=true&w=majority";

var posts = require("./model"); // 스키마 불러오기

app.post("/add", function(req, res) {
  const { id, image } = req.body; 

  console.log(req.body);

  var postModel = new posts();
  postModel.id = id;
  postModel.image = image;
  postModel
      .save()
      .then(res => {
          console.log("Create 완료");
          res.status(200).json({
              message: "Create success",
              data: res
          });
      })
      .catch(err => {
          res.status(500).json({
              message: err
          });
      });
});

mongoose.connect(mongoURI)
  .then(() => console.log( "MongoDB Connected success !!" ))
  .catch(err => console.log( err ))

app.listen(8080, ()=>{
  console.log('포트번호 8080 서버접속')
})
  
app.get('/', (req, res)=>{ 
    res.sendFile(__dirname +'/index.html') 
});  

app.get('/input', (req, res)=>{ 
    res.sendFile(__dirname +'/input.html')
  });

// app.get("/add", function(req, res, next) {
//   console.log(res.body);

//   posts
//     .find()
//     .then(res => {
//       console.log("Read All 완료");
//       res.status(200).json({
//         message: "Read All success",
//         data: res
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: err
//       });
//     });
// });