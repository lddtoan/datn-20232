import React, { useState } from "react";
import './CreatePost.css';
import logo from '../../asset/psychological.jpg';
import { useNavigate } from 'react-router-dom';
import Search from "../home/Search";
import RecentActivity from "../home/RecentActivity";
import axios from "axios";

const CreatePost = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        topic: '',
        purpose: ''
    });

    const topics = [
        'Lạm dụng, nghiện các chất',
        'Căng thẳng & Kiệt quệ tinh thần',
        'Trầm cảm & Lo lắng',
        'Đau buồn & Mất mát',
        'Các mối quan hệ bạn bè, gia đình, xã hội',
        'Độc thân & Các mối quan hệ tình cảm',
        'Công việc, tiền bạc, tài chính',
        'Các vấn đề liên quan đến trẻ em',
        'Trường học và học tập',
        'Tự tử & Tự làm hại bản thân',
        'Tình dục & LGBT',
        'Ăn uống, dinh duỡng',
        'Sức khoẻ',
        'Các chủ đề khác'
    ];

    const purposes = [
        'Cần lời khuyên',
        'Đưa lời khuyên',
        'Tâm sự và chia sẻ',
        'Câu chuyện thường ngày & Tán gẫu'
    ];

    const handleLogoClick = () => {
        navigate('/home');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi API để gửi dữ liệu postData lên server
            const response = await axios.post('/api/posts', postData);
            console.log(response.data); 
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu có
        }
    };
    
    return (
        <div className="main-content">
            <div className="navbar">
                <div className="logo-container" onClick={handleLogoClick}>
                    <img src={logo} alt="Diễn đàn tân lý" className="logo"></img>                    
                </div>
                <ul className="menu-list">
                    <li className="link"><a href="/home" className="nav">Trang chủ</a></li>
                    <li className="link"><a href="/create-post" className="nav">Tạo bài viết</a></li>
                    <li className="link"><a href="/info" className="nav">Hồ sơ cá nhân</a></li>
                    <li className="link"><a href="/message" className="nav">Tin nhắn</a></li>
                    <li className="link"><a href="/contact" className="nav">Liên hệ</a></li>
                    <li className="link"><a href="/" className="nav">Đăng xuất</a></li>
                </ul>
            </div>

            <div className="left-content">
                <div className="create-bar">
                    <h1 id="create-title">Tạo bài viết</h1>
                </div>

                <div className="post">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Tiêu đề:</label><br />
                        <input type="text" id="title" name="title" value={postData.title} onChange={handleChange} required /><br /><br />

                        <label htmlFor="content">Nội dung:</label><br />
                        <textarea id="content" name="content" value={postData.content} onChange={handleChange} rows="6" cols="50" required></textarea><br /><br />

                        <label htmlFor="topic">Chủ đề:</label><br />
                    <select id="topic" name="topic" value={postData.topic} onChange={handleChange} required>
                        <option value="">Chọn chủ đề</option>
                        {topics.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select><br /><br />

                    <label htmlFor="purpose">Mục đích thảo luận:</label><br />
                    <select id="purpose" name="purpose" value={postData.purpose} onChange={handleChange} required>
                        <option value="">Chọn mục đích</option>
                        {purposes.map(purpose => (
                            <option key={purpose} value={purpose}>{purpose}</option>
                        ))}
                    </select><br /><br />


                        <button type="submit">Đăng bài</button>
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
}

export default CreatePost;
