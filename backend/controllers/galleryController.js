const asyncHandler = require('express-async-handler');
const {upload} = require('./awsController');


const createGallery = asyncHandler(async (req, res) => {
    const header = res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*")
    const image = req.body.body;
    const id = req.body.id;

    const result = await upload(req);
    res.status(201).json({location: result.Location});
});

const getGallery = asyncHandler(async (req, res) => {
    const id = req.query.id; //todo
    console.log(req.query);
    res.status(200).json({message:'get photos'});
    res.status(200).send(data.key)
});

module.exports = {
    createGallery,
    getGallery,
};