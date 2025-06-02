import React, { useState } from 'react';
import './AddCat.css';

const AddCat = ({ onAddCat }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    description: '',
    image: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Buat objek kucing baru
    const newCat = {
      id: Date.now().toString(), 
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      description: formData.description,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
    };

    // Kirim ke parent (misal Profile) via callback props onAddCat
    if(onAddCat) onAddCat(newCat);

    // Tampilkan popup sukses
    setShowSuccess(true);

    // Reset form
    setFormData({ name: '', age: '', gender: '', description: '', image: null });

    // Hilangkan popup setelah 2 detik
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="add-cat-page">
      <h1>Add New Cat</h1>
      <form className="add-cat-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Cat's name"
          />
        </label>

        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age in month"
          />
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the cat"
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit-btn">Add Cat</button>
      </form>

      {showSuccess && (
        <div className="popup-success">
          Cat successfully added!
        </div>
      )}
    </div>
  );
};

export default AddCat;
