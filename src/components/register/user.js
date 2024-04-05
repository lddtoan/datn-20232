const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001; // Chọn một cổng tuỳ ý

// Tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username', 
  password: 'password',
  database: 'user'
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database!');
});

// Định nghĩa route API để nhận dữ liệu từ biểu mẫu và thêm vào cơ sở dữ liệu
app.post('/register', (req, res) => {
  const { username, fullname, email, password, gender, dob, address } = req.body;

  // Thực hiện truy vấn SQL để thêm dữ liệu
  const sql = `INSERT INTO users (username, fullname, email, password, gender, dob, address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [username, fullname, email, password, gender, dob, address], (err, result) => {
    if (err) {
      console.error('Error adding user to database: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('User added to database successfully!');
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
