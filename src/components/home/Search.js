import React, { useState } from "react";
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import SearchResult from './SearchResult'; // Import component SearchResult

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (!searchTerm) {
            setError('Vui lòng nhập từ khóa tìm kiếm');
            return;
        }

        // Gửi yêu cầu tìm kiếm đến API server
        axios.get(`http://localhost:8080/search?keyword=${encodeURIComponent(searchTerm)}`)
            .then(response => {
                setSearchResults(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Lỗi khi tìm kiếm:', error);
                setError('Đã xảy ra lỗi khi tìm kiếm');
            });
    };
    
    return (
        <div>
            <h3 className="search-title">Tìm kiếm</h3>
            <div className="search-box">
                <form id="search-form">
                <label htmlFor="search-input" className="search-widget">
                    <input 
                        type="text"
                        id="search-input" 
                        placeholder="Nhập từ khóa tìm kiếm..." 
                        className="search-input" 
                        value={searchTerm} 
                        onChange={handleInputChange} 
                        required 
                    />
                </label>
                </form>
                <button type="button" onClick={handleSearch} className="search-button"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {searchResults.length > 0 && (
                <SearchResult searchResults={searchResults} keyword={searchTerm} />
            )}
        </div>
    );
};

export default Search;
