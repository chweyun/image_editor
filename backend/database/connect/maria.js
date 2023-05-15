const maria = require('mysql');

const conn = maria.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0918',
    database: 'imageEditorData',
    port:'5000' // 'Unhandled 'error' event' 뜨던 문제 이 구문 삽입하니까 해결됨 //todo
});

module.exports = conn;