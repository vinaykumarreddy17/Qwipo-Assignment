import React, { useEffect, useState } from 'react';
import { fetchCustomer, updateCustomer, deleteCustomer } from '../api';
import AddressList from './AddressList';
import { useNavigate, useParams } from 'react-router-dom';
import './CustomerProfile.css';

const CustomerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCustomer(id).then(data => {
      setCustomer(data);
      setForm(data);
    });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCustomer(id, form);
    setMessage('Customer updated successfully!');
    setEditing(false);
    fetchCustomer(id).then(setCustomer);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(id);
      setMessage('Customer deleted!');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="customer-profile">
      <h2>Customer Profile</h2>
      {!editing ? (
        <>
          <div className="profile-details">
            <strong>Name:</strong> {customer.first_name} {customer.last_name}<br />
            <strong>Phone:</strong> {customer.phone}<br />
            <strong>City:</strong> {customer.city}<br />
            <strong>State:</strong> {customer.state}<br />
            <strong>Pincode:</strong> {customer.pincode}<br />
            <strong>Status:</strong> {customer.only_one_address ? "Only One Address" : "Multiple Addresses"}
          </div>
          <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input name="first_name" value={form.first_name} onChange={handleChange} required />
          <input name="last_name" value={form.last_name} onChange={handleChange} required />
          <input name="phone" value={form.phone} onChange={handleChange} required />
          <input name="city" value={form.city} onChange={handleChange} required />
          <input name="state" value={form.state} onChange={handleChange} required />
          <input name="pincode" value={form.pincode} onChange={handleChange} required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
      <AddressList customerId={id} />
      {message && <div className="profile-message">{message}</div>}
    </div>
  );
};

export default CustomerProfile;