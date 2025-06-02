import React, { useState } from 'react';
import './AdoptionFormModal.css';

const AdoptionFormModal = ({ show, onClose, catName, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setShowSuccess(true);
    setFormData({ fullName: '', email: '', phone: '', reason: '' });

    // hide success popup and close modal after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adopt {catName}</h2>
        <form className="adopt-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="reason"
            placeholder="Why do you want to adopt?"
            value={formData.reason}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>

        {showSuccess && (
          <div className="success-popup">
            🎉 Thank you! We’ll contact you soon to discuss adopting {catName} 🐾
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionFormModal;
