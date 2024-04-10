// npm install mysql2
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const cors = require('cors');
const app = express();
const port = 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});
connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// // Endpoint API để nhận dữ liệu từ frontend và chèn vào database
app.post('/api/users', (req, res) => {
    try {
        const formData = req.body;
        console.log('form: ', formData)
        connection.query(`INSERT INTO users (username, fullname, email, password, gender,dob, address,avatar, avatarUrl) VALUES ('${formData.username}', '${formData.fullname}', '${formData.email}', '${formData.password}', '${formData.gender}','${formData.dob}','${formData.address}','${formData.avatar}','${formData.avatarUrl}')`, (err, result) => {
        if (err) {
            console.error('Lỗi kết nối dữ liệu:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Người dùng được tạo:', result.insertId);
            res.status(200).send('Thêm mới người dùng thành công');
        }
    });
    }
    catch(err){
        console.log(err)
    }});

//     // connection.query('INSERT INTO users VALUES ?', formData, (err, result) => {
//     //     if (err) {
//     //         console.error('Lỗi kết nối dữ liệu:', err);
//     //         res.status(500).send('Internal Server Error');
//     //     } else {
//     //         console.log('Người dùng được tạo:', result.insertId);
//     //         res.status(200).send('Thêm mới người dùng thành công');
//     //     }
//     // });
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
 


