import React from "react";
import './Topic1.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import TopicContent from "./TopicContent";

const Topic1 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="topic-bar">
                    <h1 id="topic-title">Lạm dụng & Nghiện</h1>
                </div>

                <div className="topic-posts">
                    <TopicContent />
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

export default Topic1;
