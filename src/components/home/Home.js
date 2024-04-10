import React from "react";
import './Home.css';
import logo from '../../asset/psychological.jpg';
import { useNavigate } from 'react-router-dom';
import Topic from "./Topic.js";
import Purpose from "./Purpose.js";

const Home = () => {
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
                    <li className="link"><a href="/">Trang chủ</a></li>
                    <li className="link"><a href="/login">Đăng nhập/Đăng ký</a></li>
                    <li className="link"><a href="/contact">Liên hệ</a></li>
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
            </div>

            <div className="right-content">
                <div className="search">
                    <h3 className="search-title">Tìm kiếm</h3>
                <div className="search-box">
                    <form>
                       <input type="text" placeholder="Tìm kiếm..." className="search-input" value=""/>
                    </form>
                </div>
                </div>

            </div> 
        </div>    
        
    );
}

export default Home;
