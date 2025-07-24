import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AdminTable = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    date: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    if (!formData.email.includes('@')) tempErrors.email = 'Enter a valid email.';
    if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = 'Phone must be 10 digits.';
    if (!formData.date) tempErrors.date = 'Date is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleReset = () => {
    setFormData(initialState);
    setErrors({});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Reservation saved successfully!');
        handleReset();
      } else {
        toast.error(data.message || 'Failed to save reservation');
      }
    } catch (err) {
      toast.error('Server error. Try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="w-full border p-2 mb-1"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          className="w-full border p-2 mb-1"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          className="w-full border p-2 mb-1"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <label>Date:</label>
        <input
          type="date"
          name="date"
          className="w-full border p-2 mb-1"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTable;
