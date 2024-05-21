const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8080; 
const jwt = require('jsonwebtoken');
const topicRoutes = require('./topicControl')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datn'
});
db.connect();

app.use(cors());app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

const jwt_secret = 'b96df5dab1b40f674d2c33871193263ce27a5c1bc824a1365f3bb0255ec47056';

app.post('/api/users', (req, res) => {
    const formData = req.body;

    const query = `INSERT INTO users (username, fullname, email, password, gender, dob, address, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [formData.username, formData.fullname, formData.email, formData.password, formData.gender, formData.dob, formData.address, formData.avatarUrl], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới database:', err);
            res.status(500).json('Internal Server Error');
        } else {
            console.log('Người dùng mới:', result.insertId);
            res.status(200).json('Tạo mới người dùng thành công !');
        }
    });
});

app.post('/api/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    // Kiểm tra xem usernameOrEmail có phải là username hay email
    const query = `SELECT id, username, email, fullname, dob, gender, address, avatarUrl FROM users WHERE (username = ? OR email = ?) AND password = ?`;
    db.query(query, [usernameOrEmail, usernameOrEmail, password], (err, result) => {
        if (err) {
            console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
            res.status(500).json('Lỗi máy chủ nội bộ');
        } else if (result.length > 0) {
                const user = result[0];
                console.log('Người dùng đăng nhập thành công :', usernameOrEmail);
                // Tạo jwt 
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    avatarUrl: user.avatarUrl
                }, jwt_secret, { expiresIn: '3h' })
                // Trả về token và thông tin người dùng
                return res.status(200).json({ 
                    message: 'Đăng nhập thành công !',
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                        fullname: user.fullname,
                        avatarUrl: user.avatarUrl
                    }
                });
            } else {
                console.log('Sai tên đăng nhập hoặc mật khẩu');
                res.status(401).json('Sai tên đăng nhập hoặc mật khẩu');
            }
    });
});

// Middleware để xác thực JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwt_secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token không hợp lệ' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Token không được cung cấp' });
    }
};

// Sử dụng middleware cho các route cần bảo vệ
app.get('/api/protected-route', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Bạn đã truy cập thành công vào route bảo vệ !', user: req.user });
});

// Endpoint API để thêm bài viết mới
app.post('/api/add-post', authenticateJWT, (req, res) => {
    const { title, content, topic, purpose, imageURL, videoURL } = req.body;
    const userId = req.user.id; // Lấy id của người dùng từ JWT

    const query = `INSERT INTO posts (userID, title, content, topic, purpose, datePosted, imageURL, videoURL) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`;
    db.query(query, [userId, title, content, topic, purpose, imageURL, videoURL], (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm bài viết mới:', err);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        } else {
            res.status(200).json({ message: 'Bài viết đã được thêm thành công' });
        }
    });
});

// Bài viết gần nhất
app.get('/api/recent-posts', (req, res) => {
    // Lấy thời gian hiện tại của yêu cầu
    const requestTime = new Date();

    const query = `SELECT post_id, username, avatarUrl, title, topic, purpose, likeCount, datePosted 
                FROM posts 
                JOIN users ON posts.userID = users.id 
                ORDER BY datePosted DESC 
                LIMIT 10`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
            return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
        }
        res.json({
            data: results,
            requestTime: requestTime // Gửi thời điểm yêu cầu
        });
    });
});

// API endpoint để lấy thông tin bài viết theo chủ đề
app.use('/api/:topic', topicRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});