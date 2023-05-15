const express = require('express');
const cors = require('cors');
const url = require('url');

require('dotenv').config();

const app = express();

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: false}));

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true, origin: true, methods: 'GET,POST' }));

// route를 정의
app.use('/api/gallery', require('./routes/galleryRoutes'));

const PORT = process.nextTick.PORT || 5000; //todo

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// const maria = require('./database/connect/maria');
// maria.connect();

// maria.query('SELECT * from imagedata', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
//   });

// connection.end();