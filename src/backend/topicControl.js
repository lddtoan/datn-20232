const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datn'
});
db.connect();

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// API endpoint để lấy thông tin bài viết theo chủ đề
router.get('/:topic', (req, res) => {
  const topic = req.params.topic;
  const query = `
    SELECT 
      u.username, 
      u.avatarUrl, 
      p.title, 
      p.purpose, 
      p.likeCount, 
      p.unlikeCount, 
      p.datePosted, 
      COUNT(c.comment_id) AS totalComments
    FROM 
      posts p
    JOIN 
      users u ON p.user_id = u.id
    LEFT JOIN 
      comments c ON p.post_id = c.post_id
    WHERE 
      p.topic = ?
    GROUP BY 
      p.post_id, u.username, u.avatarUrl, p.title, p.purpose, p.likeCount, p.unlikeCount, p.datePosted
    ORDER BY 
      p.datePosted DESC;
  `;
  db.query(query, [topic], (err, results) => {
    if (err) {
      console.error('Lỗi truy xuất mã SQL: ' + err);
      res.status(500).json({ error: 'Failed to execute query' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;