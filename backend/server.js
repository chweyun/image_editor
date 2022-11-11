const express = require('express');
const cors = require('cors');
const url = require('url');

require('dotenv').config();
// const BUCKET_URL = process.env.AWS_BUCKET_URL;

const app = express();

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: false}));

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true, origin: true, methods: 'GET,POST' }));

// route를 정의
app.use('/api/gallery', require('./routes/galleryRoutes'));

const PORT = process.nextTick.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// const urlStr = url;
// const urlObj = url.parse(urlStr, true);
// const path = id.path;