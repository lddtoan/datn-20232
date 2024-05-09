import React from "react";
import "./Purpose.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

const Purpose = () => {
  return (
    <div className="purpose-table">
      <div className="wpforo-category">
        <div className="wpforo-cat-panel">
          <div className="cat-title" title="">
            <span className="cat-icon">
              <FontAwesomeIcon icon={faPeopleGroup} />
            </span>
            <span className="cat-name">MỤC ĐÍCH THẢO LUẬN</span>
          </div>
        </div>
      </div>

      <div className="forum-purpose">
        <div className="forum-purpose-list">
          <div className="purpose-item1">
            <a href="/">Cần lời khuyên</a>
          </div>

          <div className="purpose-item2">
            <a href="/">Đưa lời khuyên</a>
          </div>

          <div className="purpose-item3">
            <a href="/">Tâm sự và chia sẻ</a>
          </div>

          <div className="purpose-item4">
            <a href="/">Câu chuyện thường ngày & Tán gẫu</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purpose;
