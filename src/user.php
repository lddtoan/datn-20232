<?php
// Kết nối đến cơ sở dữ liệu
$servername = "localhost";
$username = "username"; // Thay username bằng username của bạn
$password = "password"; // Thay password bằng password của bạn
$dbname = "database_name"; // Thay database_name bằng tên của cơ sở dữ liệu của bạn

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Lấy dữ liệu từ biểu mẫu
$username = $_POST['username'];
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$password = $_POST['password'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$address = $_POST['address'];

// Thêm dữ liệu vào cơ sở dữ liệu
$sql = "INSERT INTO users (username, fullname, email, password, gender, dob, address)
        VALUES ('$username', '$fullname', '$email', '$password', '$gender', '$dob', '$address')";

if ($conn->query($sql) === true) {
  echo "Dữ liệu đã được thêm thành công";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
