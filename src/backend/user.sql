CREATE DATABASE user_demo 

use user_demo

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  dob DATE NOT NULL,
  address TEXT NOT NULL,
  avatarUrl VARCHAR(255)
);
