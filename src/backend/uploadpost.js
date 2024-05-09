const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "post",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Sử dụng body-parser để lấy dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint để tạo bài viết mới
app.post("/api/posts", (req, res) => {
  const { title, content, topic, purpose } = req.body;

  const post = {
    title: title,
    content: content,
    topic: topic,
    purpose: purpose,
  };

  connection.query(
    "INSERT INTO Posts SET ?",
    post,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).send("Post created successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
