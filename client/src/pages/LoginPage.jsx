import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi login berhasil kalau kedua field tidak kosong
    if (formData.email && formData.password) {
      navigate('/home');
    } else {
      alert('Isi dulu dong email sama password-nya~ 😾');
    }
  };

  return (
    <div className="login-container">
      <h2>Login ke PawsConnect</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Meow~ Login</button>
      </form>
      <p>Belum punya akun? <a href="/signup">Daftar yuk!</a></p>
    </div>
  );
}

export default LoginPage;
