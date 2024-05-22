import React, { useState, useEffect } from "react";
import axios from 'axios';
import './UserInfo.css';
import NavBar from "./NavBar";
import Search from "./Search";
import RecentActivity from "./RecentActivity";

const UserInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/user-info', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                }
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="profile-bar">
                    <h1 id="profile-title">Hồ sơ người dùng</h1>
                </div>

                <div className="user-stats">
                    {!user ? (
                        <div className="loading">Đang tải thông tin người dùng...</div>
                    ) : (
                        <>
                            <h1>Thông tin người dùng</h1>
                            <p>Tên đăng nhập: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Họ tên đầy đủ: {user.fullname}</p>
                            <p>Ngày sinh: {user.dob}</p>
                            <p>Giới tính: {user.gender}</p>
                            <p>Địa chỉ: {user.address}</p>
                            <p>Avatar: <img src={user.avatarUrl} alt="Avatar" /></p>
                            <h2>Thống kê</h2>
                            <p>Tổng số bài viết: {user.totalPosts}</p>
                            <p>Tổng số bình luận: {user.totalComments}</p>
                            <p>Tổng số lượt thích: {user.totalLikes}</p>
                            <p>Tổng số lượt không thích: {user.totalUnlikes}</p>
                        </>
                    )}
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

export default UserInfo;
