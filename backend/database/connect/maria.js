const maria = require('mysql');

const conn = maria.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0918',
    database: 'imageEditorData'
});

module.exports = conn;