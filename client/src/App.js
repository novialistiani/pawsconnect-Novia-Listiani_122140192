import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/LoginPage';
import Signup from './pages/Signup';
import Adopsi from './pages/Adopt'; // ✅ Tambahin ini

function App() {
  return (
    <Routes>
      {/* Default redirect ke login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Halaman lain */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/adopsi" element={<Adopsi />} /> {/* ✅ Ini juga */}
    </Routes>
  );
}

export default App;
