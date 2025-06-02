import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage({ cats = [], likedCats = [] }) {
  const [activeTab, setActiveTab] = useState('added');
  const [myCats, setMyCats] = useState(cats); // state lokal untuk My Cats agar bisa update hapus
  const navigate = useNavigate();

  // Fungsi hapus kucing
  const handleDelete = async (catId) => {
    try {
      console.log('ID kucing yang mau dihapus:', catId); 
      await axios.delete(`/api/cats/${catId}`);
      setMyCats(myCats.filter(cat => cat.id !== catId));
    } catch (error) {
      alert('Cat has been deleted, please refresh the page!');
      console.error(error);
    }
  };

  // Render daftar kucing dengan tombol hapus hanya untuk tab 'added'
  const renderCats = (data, canDelete = false) => (
    data.length === 0 ? (
      <p className="profile-empty-msg">Belum ada kucing di sini.</p>
    ) : (
      <div className="profile-cat-list">
        {data.map((cat, index) => (
          <div key={index} className="profile-cat-card">
            <img src={cat.image} alt={cat.name} />
            <h4>{cat.name}</h4>
            <p>{cat.description}</p>
            {canDelete && (
              <button
                className="profile-delete-btn"
                onClick={() => {
                  console.log("Menghapus kucing dengan ID:", cat.id); // <<< INI JUGA LOG 🐱
                  handleDelete(cat.id);
                }}
              >
                Hapus
              </button>
            )}
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="profile-page-container">
      <div className="profile-card-container">
        <div className="profile-header">
          <div className="profile-avatar-placeholder" />
          <div className="profile-info">
            <h2>Novia Listiani</h2>
            <p className="profile-email">novialistiani18@gmail.com</p>
            <button className="profile-add-btn" onClick={() => navigate('/add')}>
              + Add Cat
            </button>
          </div>
        </div>
        <div className="profile-about">
          <h4>About Me</h4>
          <p>Hai! Aku Novia, pecinta kucing yang senang memberi mereka rumah penuh cinta 🐾</p>
        </div>
      </div>

      <div className="profile-tab-bar">
        <button
          className={`profile-tab-btn ${activeTab === 'added' ? 'active' : ''}`}
          onClick={() => setActiveTab('added')}
        >
          My Cats
        </button>
        <button
          className={`profile-tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Liked Cats
        </button>
      </div>

      <div className="profile-tab-content">
        {activeTab === 'added' ? renderCats(myCats, true) : renderCats(likedCats)}
      </div>
    </div>
  );
}
