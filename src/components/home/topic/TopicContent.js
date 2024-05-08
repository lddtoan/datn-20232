import React from "react";
import './TopicContent.css'

const TopicContent = () => {
    return(
        <div className="topic-header">
            <div className="topic-infor author">Người viết</div>
            <div className="topic-infor title">Tiêu đề</div>
            <div className="topic-infor purpose">Mục đích</div>
            <div className="topic-infor like">Thích</div> 
            <div className="topic-infor comment">Bình luận</div>
            <div className="topic-infor time">Thời gian</div>  
        </div>
    )
}

export default TopicContent