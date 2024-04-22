import React, { useState } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';

function LogInForm() {
  const [formLogin, setformLogin] = useState({
    username_or_email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformLogin({ ...formLogin, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formLogin)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Nếu thông tin đăng nhập hợp lệ, chuyển hướng đến component khác
      navigate('/home');
    } catch (error) {
      // Xử lý lỗi khi thông tin đăng nhập không hợp lệ
      setError(error.message);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="login-form">
        <div className="title">
          <h1><i>Đăng nhập</i></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input type="text" id="username_or_email" name="username_or_email" value={formLogin.username_or_email} onChange={handleChange} placeholder="Tên người dùng hoặc email" required />
          </div>

          <div className="inputBox">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formLogin.password} onChange={handleChange} placeholder="Mật khẩu" required />
            <button type="button" onClick={handleTogglePassword}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
          </div>

          <button type="submit">Đăng nhập</button>
        </form>

        {error && <div className="error">{error}</div>}

        <div className="register">Chưa có tài khoản? <span onClick={() => navigate('/register')}>Đăng ký ngay !</span></div>
        <div className="home">Quay về diễn đàn chính?<span onClick={() => navigate('/')}> Trang chủ</span></div>
      </div>
    </div>
  );
}

export default LogInForm;
