import React, { useState } from 'react';
import { createAddress, updateAddress } from '../api';

const AddressForm = ({ customerId, address, onSuccess }) => {
  const [form, setForm] = useState(
    address || { address_line: '', city: '', state: '', pincode: '' }
  );

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (address) {
      await updateAddress(address.id, form);
    } else {
      await createAddress({ customer_id: customerId, ...form });
    }
    setForm({ address_line: '', city: '', state: '', pincode: '' });
    if (onSuccess) onSuccess();
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input name="address_line" placeholder="Address" value={form.address_line} onChange={handleChange} required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
      <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
      <button type="submit">{address ? 'Update' : 'Add'} Address</button>
    </form>
  );
};

export default AddressForm;