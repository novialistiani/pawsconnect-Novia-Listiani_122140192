import React, { useState, useEffect } from 'react';
import './Adopt.css';
import { getCats } from './Petfinder';
import { useNavigate } from 'react-router-dom';
import AdoptionFormModal from './AdoptionFormModal';

const fallbackImage = 'https://placekitten.com/300/200';

const fallbackCats = [
  // fallback data...
];

const Adopt = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedCats, setSavedCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // popup sukses

  const navigate = useNavigate();

  const toggleSave = (id) => {
    setSavedCats((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCats();
        if (!Array.isArray(data) || data.length === 0) {
          setCats(fallbackCats);
        } else {
          const adapted = data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            image: cat.photos?.[0]?.medium || fallbackImage,
            description: cat.description || 'No description available.',
          }));
          setCats(adapted);
        }
      } catch (err) {
        console.error('API Error:', err);
        setCats(fallbackCats);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  const handleImageError = (e) => {
    if (e.target.src !== fallbackImage) {
      e.target.src = fallbackImage;
    }
  };

  const handleAdopt = (cat) => {
    setSelectedCat(cat);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCat(null);
  };

  const handleFormSubmit = (formData) => {
    // Close modal, show popup sukses selama 3 detik
    setShowForm(false);
    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);

    
  };

  return (
    <div className="adopt-page">
      {loading ? (
        <div className="loading-box">
          <p className="loading-text">Loading cats, please wait...</p>
        </div>
      ) : (
        <>
          <div className="adopt-header">
            <h1>Cats Available for Adoption</h1>
            <div className="header-buttons">
              <button className="profile-btn" onClick={() => navigate('/profile')}>
                Profile
              </button>
              <button className="add-cat-btn" onClick={() => navigate('/add')}>
                + Add Cat
              </button>
            </div>
          </div>

          <div className="cat-list">
            {cats.map((cat, index) => (
              <React.Fragment key={cat.id}>
                <div className="cat-card">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onClick={() => setSelectedCat(cat)}
                    className="cat-img"
                    onError={handleImageError}
                  />
                  <button
                    className={`heart-btn ${savedCats.includes(cat.id) ? 'saved' : ''}`}
                    onClick={() => toggleSave(cat.id)}
                    aria-label={savedCats.includes(cat.id) ? 'Unsave cat' : 'Save cat'}
                  >
                    ♥
                  </button>
                  <div className="cat-info">
                    <h3>{cat.name}</h3>
                  </div>
                </div>

                {(index + 1) % 8 === 0 && (
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      textAlign: 'center',
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: '#fff',
                      backgroundColor: 'rgba(123, 94, 255, 0.85)',
                      padding: '15px 0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 10px rgba(123, 94, 255, 0.7)',
                      margin: '20px 0',
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      letterSpacing: '3px',
                      animation: 'pulse 2.5s ease-in-out infinite',
                      userSelect: 'none',
                    }}
                  >
                    finding meow for you...
                    <style>{`
                      @keyframes pulse {
                        0%, 100% {
                          opacity: 1;
                          transform: scale(1);
                        }
                        50% {
                          opacity: 0.7;
                          transform: scale(1.05);
                        }
                      }
                    `}</style>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* Popup deskripsi kucing */}
      {selectedCat && !showForm && (
        <div className="cat-desc-popup">
          <img src={selectedCat.image} alt={selectedCat.name} onError={handleImageError} />
          <h3>{selectedCat.name}</h3>
          <p>{selectedCat.description}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => setSelectedCat(null)}>Close</button>
            <button
              style={{
                backgroundColor: '#7b5eff',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
              onClick={() => handleAdopt(selectedCat)}
            >
              Adopt
            </button>
          </div>
        </div>
      )}

      {/* Modal adopsi */}
      {showForm && selectedCat && (
        <AdoptionFormModal
          show={showForm}
          onClose={handleCloseForm}
          catName={selectedCat.name}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Popup sukses */}
      {showSuccessPopup && (
        <div className="success-popup">
          🎉 Thank you! We’ll contact you soon to discuss adopting {selectedCat?.name} 🐾
        </div>
      )}
    </div>
  );
};

export default Adopt;
