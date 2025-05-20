import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi signup berhasil
    navigate('/');
  };

  return (
    <div className="signup-container">
      <h2>Gabung ke PawsConnect</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Daftar Meow~</button>
      </form>
      <p>Sudah punya akun? <a href="/login">Login di sini</a></p>
    </div>
  );
}

export default Signup;
