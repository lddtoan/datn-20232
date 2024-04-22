import React from "react";
import './RecentPost.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const RecentPost = () => {
    return (
        <div className="recent-post-table">
            <div className="wpforo-category">
               <div className="wpforo-cat-panel">
                    <div className="cat-title" title="">
                        <span className="cat-icon">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                        </span>
                    <span className="cat-name">BÀI VIẾT GẦN ĐÂY</span>
                    </div>
                </div>
                <div className="recent-post-header">
                    <div className="recent-post-box author">Người viết</div>
                    <div className="recent-post-box title">Tiêu đề</div>
                    <div className="recent-post-box topic">Chủ đề</div>
                    <div className="recent-post-box purpose">Mục đích</div>
                    <div className="recent-post-box like">Thích</div>  
                    <div className="recent-post-box time">Thời gian</div>  
                </div>
            </div>
        

        </div>
            
        
    );
}

export default RecentPost;

