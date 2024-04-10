CREATE DATABASE user_demo 

use user_demo

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender ENUM('Nam', 'Nữ', 'Khác') NOT NULL,
    dob DATE NOT NULL,
    address TEXT NOT NULL,
    avatarUrl TEXT
);
