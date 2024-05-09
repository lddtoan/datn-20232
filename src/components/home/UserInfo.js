import React, { useState } from "react";
import "./UserInfo.css";
import NavBar from "./NavBar";
import Search from "./Search";
import RecentActivity from "./RecentActivity";

const UserInfo = () => {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }

      const data = await response.json();
      setUserInfo(data);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch user information");
      setUserInfo(null);
    }
  };

  return (
    <div className="main-content">
      <div className="navbar">
        <NavBar />
      </div>

      <div className="left-content">
        <div className="create-bar">
          <h1 id="create-title">Hồ sơ người dùng</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <button type="submit">View Info</button>
        </form>
        {error && <p>Error: {error}</p>}
        {userInfo && (
          <div>
            <h2>User Information</h2>
            <p>Username: {userInfo.username}</p>
            <p>Fullname: {userInfo.fullname}</p>
            {/* Hiển thị thông tin người dùng khác tại đây */}
          </div>
        )}
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

export default UserInfo;
