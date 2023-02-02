require('dotenv').config();

const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const axios = require('axios');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
});

function upload(file) {
    const fileStream = fs.createReadStream(file.file.path);
    const uploadParams = {
        Bucket: bucketName,
        Key: file.body.id,
        Body: fileStream,
        ContentType: 'image/png',
    };
    // return s3.upload(uploadParams).promise();
    return s3.upload(uploadParams, function(err, data) {
        console.log(err);
        console.log(data);
    });
}

module.exports = {upload};