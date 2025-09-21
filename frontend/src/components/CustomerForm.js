import React, { useState } from 'react';
import { createCustomer } from '../api';
import './CustomerForm.css';

const initialState = {
  first_name: '',
  last_name: '',
  phone: '',
  city: '',
  state: '',
  pincode: '',
};

const CustomerForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.phone || !form.city || !form.state || !form.pincode) {
      setMessage('All fields are required!');
      return;
    }
    const res = await createCustomer(form);
    setMessage(res.message);
    setForm(initialState);
    if (onSuccess) onSuccess();
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      {Object.keys(initialState).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key.replace('_', ' ')}
          value={form[key]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Add Customer</button>
      <div className="form-message">{message}</div>
    </form>
  );
};

export default CustomerForm;