const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datn'
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối đến MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Route để lấy thông tin bài viết theo chủ đề
app.get('/posts/:topic', (req, res) => {
  const topic = req.params.topic;

  const sql = `
    SELECT 
      users.username AS author_username,
      users.avatarUrl AS author_avatar,
      posts.title,
      posts.purpose,
      posts.likeCount,
      posts.unlikeCount,
      COUNT(comments.commentID) AS commentCount,
      posts.datePosted
    FROM 
      posts
    JOIN 
      users ON posts.userID = users.id
    LEFT JOIN 
      comments ON posts.post_id = comments.postID
    WHERE 
      posts.topic = ?
    GROUP BY 
      posts.post_id
    ORDER BY 
      posts.datePosted DESC;
  `;

  db.query(sql, [topic], (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

module.exports = router;