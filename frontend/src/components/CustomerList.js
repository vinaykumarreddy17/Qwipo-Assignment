import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = ({ customers, setFilters }) => {
  const navigate = useNavigate();

  return (
    <div className="customer-list">
      <h2>Customers</h2>
      <input
        className="search-input"
        placeholder="Search by city"
        onChange={e => setFilters({ city: e.target.value })}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>City</th><th>State</th><th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id} onClick={() => navigate(`/customer/${c.id}`)}>
              <td>{c.id}</td>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.phone}</td>
              <td>{c.city}</td>
              <td>{c.state}</td>
              <td>{c.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;