import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/LoginPage';
import Signup from './pages/Signup';
import Adopt from './pages/Adopt';
import Profile from './pages/Profile';
import AddCat from './pages/AddCat';

function App() {
  // State untuk nyimpen kucing user
  const [userCats, setUserCats] = useState([]);

  // Fungsi buat nambah kucing baru
  const handleAddCat = (newCat) => {
    setUserCats(prev => [...prev, newCat]);
  };

  return (
    <Routes>
      {/* Default redirect ke login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Halaman lain */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/adopt" element={<Adopt />} />
      <Route path="/profile" element={<Profile cats={userCats} />} />
      <Route path="/add" element={<AddCat onAddCat={handleAddCat} />} />
    </Routes>
  );
}

export default App;
