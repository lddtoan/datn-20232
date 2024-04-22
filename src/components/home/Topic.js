import React from "react";
import './Topic.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faWineBottle, faFaceTired, faFaceFrown, faFaceSadTear, faUserGroup, faHeart, faSackDollar, faBaby, faSchool, faFaceDizzy, faVenusMars, faBurger, faNotesMedical, faQuestion } from "@fortawesome/free-solid-svg-icons";

const Topic = () => {
    return (
                <div className="topic-table">
                    <div className="wpforo-category">
                        <div className="wpforo-cat-panel">
                            <div className="cat-title" title="">
                                <span className="cat-icon">
                                    <FontAwesomeIcon icon={faPeopleGroup} />
                                </span>
                                <span className="cat-name">CÁC CHỦ ĐỀ THẢO LUẬN</span>
                            </div>
                        </div>
                    </div>

                    <div className="forum-topic">
                        <div className="forum-topic-list">   
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item1" icon={faWineBottle} />
                                </span>
                                <a href="/">Lạm dụng, nghiện các chất</a>   
                            </div>
                            
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item2" icon={faFaceTired} />
                                </span>
                                <a href="/">Căng thẳng & Kiệt quệ tinh thần</a>   
                            </div>
                            
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item3" icon={faFaceFrown} />
                                </span>
                                <a href="/">Trầm cảm & Lo lắng</a>   
                            </div>
                            
                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item4" icon={faFaceSadTear} />
                                </span>
                                <a href="/">Đau buồn & Mất mát</a>   
                            </div>                            

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item5" icon={faUserGroup} />
                                </span>
                                <a href="/">Các mối quan hệ bạn bè, gia đình, xã hội</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item6" icon={faHeart} />
                                </span>
                                <a href="/">Độc thân & Các mối quan hệ tình cảm</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item7" icon={faSackDollar} />
                                </span>
                                <a href="/">Công việc, tiền bạc, tài chính</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item8" icon={faBaby} />
                                </span>
                                <a href="/">Các vấn đề liên quan đến trẻ em</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item9" icon={faSchool} />
                                </span>
                                <a href="/">Trường học và học tập</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item10" icon={faFaceDizzy} />
                                </span>
                                <a href="/">Tự tử & Tự làm hại bản thân</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item11" icon={faVenusMars} />
                                </span>
                                <a href="/">Tình dục & LGBT</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item12" icon={faBurger} />
                                </span>
                                <a href="/">Ăn uống, dinh duỡng</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item13" icon={faNotesMedical} />
                                </span>
                                <a href="/">Sức khoẻ</a>   
                            </div>

                            <div className="topic-item">                    
                                <span className="topic-item-icon">
                                    <FontAwesomeIcon className = "item14" icon={faQuestion} />
                                </span>
                                <a href="/">Các chủ đề khác</a>   
                            </div>                            
                        </div>
                    </div>
                </div>
        
    );
}

export default Topic;

