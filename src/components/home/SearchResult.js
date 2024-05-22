import React from 'react';
import PropTypes from 'prop-types';
import NavBar from "../NavBar";
import Search from "../Search";
import RecentActivity from "../RecentActivity";
// import './SearchResult.css';

const SearchResult = ({ searchResults, keyword }) => {
    return (
        <div className="main-content">
        <div className="navbar">
            <NavBar />
        </div>

        <div className="left-content">
            <div className='search-result'>
                <h3 id='search-keyword'>Kết quả tìm kiếm cho "{keyword}" :</h3>
                {searchResults.length > 0 ? (
                    <table className="search-result-table">
                        <thead>
                            <tr>
                                <th>Người đăng</th>
                                <th>Tiêu đề</th>
                                <th>Chủ đề</th>
                                <th>Mục đích</th>
                                <th>Ngày đăng</th>
                                <th>Lượt thích / Không thích</th>
                                <th>Nội dung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map(result => (
                                <tr key={result.post_id}>
                                    <td>
                                        <div className="user-info">
                                            <img src={result.avatarUrl} alt="Avatar" className="avatar" />
                                            <span className="username">{result.username}</span>
                                        </div>
                                    </td>
                                    <td>{result.title}</td>
                                    <td>{result.topic}</td>
                                    <td>{result.purpose}</td>
                                    <td>{result.datePosted}</td>
                                    <td>{result.likeCount} / {result.unlikeCount}</td>
                                    <td>{/* Hiển thị đoạn nội dung có chứa từ khóa */}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không tìm thấy kết quả nào.</p>
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
};

SearchResult.propTypes = {
    searchResults: PropTypes.array.isRequired,
    keyword: PropTypes.string.isRequired
};

export default SearchResult;
