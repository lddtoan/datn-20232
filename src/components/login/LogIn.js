import React, { useState } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';

function LogInForm() {
  const [formLogin, setformLogin] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformLogin({ ...formLogin, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: formLogin.username })
    });
    const data = await response.json();

    if (!data.exists) {
      setErrorMessage('Tài khoản không tồn tại.');
      return;
    }

    // Kiểm tra xem password có khớp với username hoặc email đã cho hay không
    const loginResponse = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: formLogin.username, password: formLogin.password })
    });
    const loginData = await loginResponse.json();

    if (loginData.error) {
      setErrorMessage('Sai mật khẩu.');
      return;
    }

    // Nếu thông tin đăng nhập chính xác, chuyển sang component khác
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="login-form">
        <div className="title">
          <h1><i>Đăng nhập</i></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input type="text" id="username" name="username" value={formLogin.username} onChange={handleChange} placeholder="Tên người dùng hoặc email" required />
          </div>

          <div className="inputBox">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formLogin.password} onChange={handleChange} placeholder="Mật khẩu" required />
            <button type="button" onClick={handleTogglePassword}>{showPassword ? 'Ẩn' : 'Hiện'}</button>
          </div>

          <button type="submit">Đăng nhập</button>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="register">Chưa có tài khoản? <span onClick={() => navigate('/register')}>Đăng ký ngay !</span></div>
        <div className="home">Quay về diễn đàn chính?<span onClick={() => navigate('/')}> Trang chủ</span></div>
      </div>
    </div>
  );
}

export default LogInForm;
