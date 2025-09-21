import React, { useEffect, useState } from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import { fetchCustomers } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchCustomers(filters).then(setCustomers);
  }, [filters, reload]);

  return (
    <div className="dashboard-page">
      <h1>Customer Management</h1>
      <CustomerForm onSuccess={() => setReload(!reload)} />
      <CustomerList customers={customers} setFilters={setFilters} />
      <button className="clear-filters-btn" onClick={() => setFilters({})}>Clear Filters</button>
    </div>
  );
};

export default Dashboard;