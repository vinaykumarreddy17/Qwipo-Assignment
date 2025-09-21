import React, { useEffect, useState } from 'react';
import { fetchAddressesByCustomer, deleteAddress } from '../api';
import AddressForm from './AddressForm';
import './AddressList.css';

const AddressList = ({ customerId }) => {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);

  const reload = () => fetchAddressesByCustomer(customerId).then(setAddresses);

  useEffect(reload, [customerId]);

  return (
    <div className="address-list">
      <h3>Addresses</h3>
      {addresses.map(address =>
        <div key={address.id} className="address-item">
          {editing === address.id ? (
            <AddressForm
              address={address}
              customerId={customerId}
              onSuccess={() => { setEditing(null); reload(); }}
            />
          ) : (
            <div className="address-details">
              {address.address_line}, {address.city}, {address.state}, {address.pincode}
              <button className="edit-btn" onClick={() => setEditing(address.id)}>Edit</button>
              <button className="delete-btn" onClick={async () => { await deleteAddress(address.id); reload(); }}>Delete</button>
            </div>
          )}
        </div>
      )}
      <AddressForm customerId={customerId} onSuccess={reload} />
    </div>
  );
};

export default AddressList;