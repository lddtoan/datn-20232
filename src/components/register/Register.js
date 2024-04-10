import React, { useState } from 'react';
import './Register.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    address: '',
    avatarUrl: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentYear = new Date().getFullYear(); 
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const currentDay = new Date().getDate().toString().padStart(2, '0'); 

  const maxDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const minDate = `1900-${currentMonth}-${currentDay}`; 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dob') {
      if (value > maxDate || value < minDate) {
        alert('Vui lòng chọn ngày sinh hợp lệ.');
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    
    // Hiển thị ảnh trước khi tải lên
    const reader = new FileReader();
    reader.onload = function(event) {
      setFormData({ ...formData, avatarUrl: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePasswordMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  const validatePasswordLength = () => {
    return formData.password.length >= 9 && formData.confirmPassword.length >= 9;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mặt khẩu
    if (!validatePasswordMatch()) {
      alert('Mật khẩu và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    if (!validatePasswordLength()) {
      alert('Mật khẩu và xác nhận mật khẩu cần ít nhất 9 ký tự.');
      return;
    }

    try {
      console.log('form data: ', formData)
      const response = await axios.post('http://localhost:8080/api/users', formData);
      console.log("data: ",response.data); // In ra kết quả từ backend
      if(response.data) {
        alert('Bạn đã đăng ký thành công');
      }
      navigate('/login'); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi khi đăng ký');
    }
  };


  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="register-form">
        <div className="title">
          <h1><i>Đăng ký tài khoản</i></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Tên người dùng" required />
          </div>

          <div className="inputBox">
            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Họ và tên" required />
          </div>

          <div className="inputBox">
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>

          <div className="inputBox">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mật khẩu" required />
            <button type="button" onClick={handleTogglePassword}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
          </div>

          <div className="inputBox">
            <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Xác nhận mật khẩu" required />
            <button type="button" onClick={handleToggleConfirmPassword}>{showConfirmPassword ? 'Ẩn' : 'Hiện'}</button>
          </div>

          <div className="inputBoxGender">
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option hidden value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Giới tính khác</option>
            </select>
          </div>

          <div className="inputBox">
            <label htmlFor="dob">Ngày sinh</label>
            <input type="date" id="dob" name="dob" max={maxDate} min={minDate} value={formData.dob} onChange={handleChange} required />        
          </div>

          <div className="inputBoxAddress">
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" required></textarea>
          </div> 

          <div className="inputBox">
            <label htmlFor="avt">Avatar</label>
            <input type="file" id="avatar" name="avatar" onChange={handleFileChange} accept="image/*" />
            {/* Hiển thị ảnh trước khi tải lên */}
            {formData.avatarUrl && (
              <div className="avatar-preview">
                <img src={formData.avatarUrl} alt="Avatar Preview" className="avatar-image" />
              </div>
             )}
          </div>

          <button type="submit">Đăng ký</button>
        </form>
        <div className="logIn">Bạn đã có tài khoản ? <span onClick={()=>navigate('login')}>Đăng nhập ngay !</span></div>
        <div className="home">Quay về diễn đàn chính?<span onClick={() => navigate('/')}> Trang chủ</span></div>
      </div>
    </div>
  );
}

export default RegisterForm;