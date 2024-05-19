import React from "react";
import './Topic12.css';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
import TopicContent from "./TopicContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from "@fortawesome/free-solid-svg-icons";

const Topic12 = () => {
    return (
        <div className="main-content">
            <div className="navbar">
                <NavBar />
            </div>

            <div className="left-content">
                <div className="topic12-bar">
                    <h1 id="topic12-title"><FontAwesomeIcon icon={faBurger} id="topic12-item"/>Ăn uống, dinh duỡng</h1>
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

export default Topic12;
