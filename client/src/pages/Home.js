import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function HomePage() {
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    navigate('/adopt'); 
  };

  return (
    <div className="home-container">
      <h1>Meow~ Welcome to PawsConnect! 🐾</h1>
      <p>Temukan teman berbulu yang siap mengisi harimu dengan cinta dan kehangatan~</p>
      <div className="button-group">
        <button className="adopt" onClick={handleAdoptClick}>
          Adopsi Sekarang 🐈‍⬛
        </button>
        
      </div>
    </div>
  );
}

export default HomePage;