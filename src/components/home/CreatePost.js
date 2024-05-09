import React, { useState } from "react";
import "./CreatePost.css";
import logo from "../../asset/psychological.jpg";
import { useNavigate } from "react-router-dom";
import Search from "../home/Search";
import RecentActivity from "../home/RecentActivity";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    topic: "",
    purpose: "",
    time: "",
    imageURL: null,
    videoURL: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const topics = [
    "Lạm dụng, nghiện các chất",
    "Căng thẳng & Kiệt quệ tinh thần",
    "Trầm cảm & Lo lắng",
    "Đau buồn & Mất mát",
    "Các mối quan hệ bạn bè, gia đình, xã hội",
    "Độc thân & Các mối quan hệ tình cảm",
    "Công việc, tiền bạc, tài chính",
    "Các vấn đề liên quan đến trẻ em",
    "Trường học và học tập",
    "Tự tử & Tự làm hại bản thân",
    "Tình dục & LGBT",
    "Ăn uống, dinh duỡng",
    "Sức khoẻ",
    "Các chủ đề khác",
  ];

  const purposes = [
    "Cần lời khuyên",
    "Đưa lời khuyên",
    "Tâm sự và chia sẻ",
    "Câu chuyện thường ngày & Tán gẫu",
  ];

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const getCurrentTime = () => {
    const now = new Date();
    const formattedTime = `${("0" + now.getHours()).slice(-2)}:${(
      "0" + now.getMinutes()
    ).slice(-2)} - ${now.getDate()} tháng ${
      now.getMonth() + 1
    } năm ${now.getFullYear()}`;
    return formattedTime;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentTime = getCurrentTime();
      setPostData({
        ...postData,
        time: currentTime,
      });

      // If a file is selected, upload it
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Send formData to server to upload file
        const fileResponse = await axios.post("/api/upload", formData);

        // Determine if uploaded file is image or video and update the respective URL
        const { fileType, fileURL } = fileResponse.data;
        if (fileType.startsWith("image")) {
          setPostData({
            ...postData,
            imageURL: fileURL,
          });
        } else if (fileType.startsWith("video")) {
          setPostData({
            ...postData,
            videoURL: fileURL,
          });
        }
      }
      // Send other postData fields along with imageURL and videoURL to server
      const response = await axios.post("/api/posts", postData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div className="main-content">
      <div className="navbar">
        <div className="logo-container" onClick={handleLogoClick}>
          <img src={logo} alt="Diễn đàn tân lý" className="logo"></img>
        </div>
        <ul className="menu-list">
          <li className="link">
            <a href="/home" className="nav">
              Trang chủ
            </a>
          </li>
          <li className="link">
            <a href="/create-post" className="nav">
              Tạo bài viết
            </a>
          </li>
          <li className="link">
            <a href="/info" className="nav">
              Hồ sơ cá nhân
            </a>
          </li>
          <li className="link">
            <a href="/message" className="nav">
              Tin nhắn
            </a>
          </li>
          <li className="link">
            <a href="/contact" className="nav">
              Liên hệ
            </a>
          </li>
          <li className="link">
            <a href="/" className="nav">
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>

      <div className="left-content">
        <div className="create-bar">
          <h1 id="create-title">Tạo bài viết</h1>
        </div>

        <div className="post">
          <form onSubmit={handleSubmit}>
            <div className="post-title">
              <label htmlFor="title">Tiêu đề:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={postData.title}
                placeholder="Nhập tiêu đề bài viết"
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-content">
              <label htmlFor="content">Nội dung:</label>
              <textarea
                id="content"
                name="content"
                value={postData.content}
                placeholder="Nhập nội dung bài viết"
                onChange={handleChange}
                rows="10"
                cols="70"
                required
              ></textarea>
            </div>

            <div className="post-topic">
              <label htmlFor="topic">Chủ đề thảo luận:</label>
              <select
                id="topic"
                name="topic"
                value={postData.topic}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chủ đề</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="post-purpose">
              <label htmlFor="purpose">Mục đích thảo luận:</label>
              <select
                id="purpose"
                name="purpose"
                value={postData.purpose}
                onChange={handleChange}
                required
              >
                <option value="">Chọn mục đích</option>
                {purposes.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </div>

            <div className="post-upload">
              <label htmlFor="file">Đăng tải ảnh hoặc video nếu có:</label>
              <input
                type="file"
                id="post-file"
                name="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
              />
            </div>

            {
              <div className="uploaded-media">
                {postData.imageURL && (
                  <img src={postData.imageURL} alt="Hình ảnh" />
                )}
                {postData.videoURL && (
                  <video controls>
                    <source src={postData.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            }

            <button className="submit-post" type="submit">
              Đăng bài
            </button>
          </form>
        </div>
      </div>

      <div className="right-content">
        <div className="search">
          <Search />
        </div>
        <div className="recent-activity">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
