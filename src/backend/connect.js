// npm install mysql2
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')

const app = express();
const port = 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_demo'
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint API để nhận dữ liệu từ frontend và chèn vào database
app.post('/api/users', (req, res) => {
    const formData = req.body;

    connection.query('INSERT INTO users SET ?', formData, (err, result) => {
        if (err) {
            console.error('Lỗi kết nối dữ liệu:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Người dùng được tạo:', result.insertId);
            res.status(200).send('Thêm mới người dùng thành công');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = connection

