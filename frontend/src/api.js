const API_URL = 'http://localhost:5000/api';

export const fetchCustomers = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/customers?${params}`);
  return res.json();
};

export const fetchCustomer = async (id) => {
  const res = await fetch(`${API_URL}/customers/${id}`);
  return res.json();
};

export const createCustomer = async (data) => {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCustomer = async (id, data) => {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
  return res.json();
};

export const fetchAddressesByCustomer = async (customerId) => {
  const res = await fetch(`${API_URL}/addresses/customer/${customerId}`);
  return res.json();
};

export const createAddress = async (data) => {
  const res = await fetch(`${API_URL}/addresses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAddress = async (addressId, data) => {
  const res = await fetch(`${API_URL}/addresses/${addressId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAddress = async (addressId) => {
  const res = await fetch(`${API_URL}/addresses/${addressId}`, { method: 'DELETE' });
  return res.json();
};