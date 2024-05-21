const express = require('express');
const app = express();

app.use(express.json());

// Function to query database for posts by topic
const getPostsByTopic = (topic) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT u.username, u.avatar_url, p.title, p.purpose, p.like_count, p.unlike_count, p.date_posted
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.topic = ?
        ORDER BY p.date_posted DESC;
      `;
      db.query(query, [topic], (err, results) => {
        if (err) {
          // Tạo một đối tượng Error với thông điệp lỗi từ MySQL
          const error = new Error('Lỗi truy vấn cơ sở dữ liệu');
          error.originalError = err; // Lưu trữ lỗi gốc từ MySQL
          reject(error); // Từ chối Promise với lỗi mới tạo
        } else {
          resolve(results);
        }
      });
    });
  };
  
// Define API routes for each topic
const topics = [
  'Lạm dụng, nghiện các chất',
  'Căng thẳng & Kiệt quệ tinh thần',
  'Trầm cảm & Lo lắng',
  'Đau buồn & Mất mát',
  'Các mối quan hệ bạn bè, gia đình, xã hội',
  'Độc thân & Các mối quan hệ tình cảm',
  'Công việc, tiền bạc, tài chính',
  'Trẻ em và trẻ vị thành niên',
  'Trường học và học tập',
  'Tự tử & Tự làm hại bản thân',
  'Tình dục & LGBT',
  'Ăn uống, dinh duỡng',
  'Sức khoẻ',
  'Các chủ đề khác'
];

// Define API routes for each topic
topics.forEach(topic => {
  app.get(`/api/posts/${encodeURIComponent(topic)}`, async (req, res) => {
    try {
      // Check if the topic is valid
      if (!topics.includes(topic)) {
        return res.status(400).json({ message: 'Chủ đề không hợp lệ' });
      }
      // Get posts by topic
      const posts = await getPostsByTopic(topic);
      if (posts.length === 0) {
        return res.status(404).json({ message: 'Không có bài viết nào cho chủ đề này' });
      }
      // Send posts as JSON response
      res.json(posts);
    } catch (err) {
      console.error('Lỗi:', err);
      res.status(500).send('Lỗi máy chủ');
    }
  });
});

