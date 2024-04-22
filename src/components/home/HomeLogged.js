import React from "react";
import './HomeLogged.css';
import logo from '../../asset/psychological.jpg';
import { useNavigate } from 'react-router-dom';
import Topic from "./Topic.js";
import Purpose from "./Purpose.js";
import Search from "./Search.js";
import RecentPost from "./RecentPost.js";
import RecentActivity from "./RecentActivity.js";

const HomeLogged = () => {
    const navigate = useNavigate(); 

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="main-content">
            <div className="navbar">
                <div className="logo-container" onClick={handleLogoClick}>
                    <img src={logo} alt="Diễn đàn tân lý" className="logo"></img>                    
                </div>
                <ul className="menu-list">
                    <li className="link"><a href="/" className="nav">Trang chủ</a></li>
                    <li className="link"><a href="/create-post" className="nav">Tạo bài viết</a></li>
                    <li className="link"><a href="/info" className="nav">Hồ sơ cá nhân</a></li>
                    <li className="link"><a href="/info" className="nav">Tin nhắn</a></li>
                    <li className="link"><a href="/info" className="nav">Liên hệ</a></li>
                    <li className="link"><a href="/info" className="nav">Đăng xuất</a></li>
                </ul>
            </div>

            <div className="left-content">
                <h1 id="title">Diễn đàn chia sẻ và hỗ trợ tâm lý</h1>
                <div className="topic">
                    <Topic />
                </div>
                <div className="purpose">
                    <Purpose />
                </div>
                <div className="recent-post">
                    <RecentPost />
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

export default HomeLogged;
