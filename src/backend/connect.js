const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8080; 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});
db.connect();

app.use(cors());app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

app.post('/api/users', async (req, res) => {
    try {
        const formData = req.body;
        // Hash password before saving to database
        const query = `INSERT INTO users (username, fullname, email, password, gender, dob, address, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [formData.username, formData.fullname, formData.email, formData.password, formData.gender, formData.dob, formData.address, formData.avatarUrl], (err, result) => {
            if (err) {
                console.error('Error connecting to database:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('User created:', result.insertId);
                res.status(200).send('New user created successfully');
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/users', (req, res) => {
  const { username_or_email, password } = req.body;

  // Kiểm tra xem username_or_email có trùng với username hoặc email trong bảng users không
  const query = `SELECT * FROM users WHERE username = ? OR email = ?`;
  connection.query(query, [username_or_email, username_or_email], (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the request.');
        return;
    }

    if (results.length === 0) {
        // Nếu không tìm thấy username hoặc email tương ứng trong bảng users
        res.status(401).send('Username or email does not exist.');
        return;
    }

    const user = results[0];

    // Kiểm tra xem password có trùng khớp với password trong bảng users không
    if (password !== user.password) {
        // Nếu password không trùng khớp
        res.status(401).send('Incorrect password.');
        return;
    }

    // Nếu thông tin đăng nhập đúng, chuyển hướng đến component khác
    res.status(200).send('Login successful.');
  });
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
