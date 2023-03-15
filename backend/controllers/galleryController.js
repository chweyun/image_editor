const asyncHandler = require('express-async-handler');
const {upload} = require('./awsController');

// mariadb connect
const maria = require('../database/connect/maria.js');
maria.connect();

const createGallery = asyncHandler(async (req, res) => {
    const header = res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*")
    const image = req.body.body;
    const id = req.body.id;

    const result = await upload(req);
    res.status(201).json({location: result.Location});

    var sql = 'insert into imagedata values (?)';
    maria.query(sql, id, function(err, rows) {
        if(err) console.log(err);
        else {
            console.log("DB insertion success!" + rows);
        }
    })
});

const getGallery = asyncHandler(async (req, res) => {
    const id = req.query.id; //todo
    console.log(req.query);
    res.status(200).json({message:'get photos'});
    res.status(200).send(data.key)

    var sql = 'SELECT * from imagedata where id = (?)';
    // maria.query(sql, id, function(error, result, fields) {
    //     if (error) throw error;
    //     else if (result[0] !== undefined) { // 해당하는 id값 존재

    //     } else { // 해당하는 id값 없음

    //     }
        
    // });


});

module.exports = {
    createGallery,
    getGallery,
};