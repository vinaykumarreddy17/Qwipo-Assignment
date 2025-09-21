const Address = require('../models/address');

exports.create = (req, res, next) => {
  Address.createAddress(req.body, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Address added', id });
  });
};

exports.listByCustomer = (req, res, next) => {
  const customerId = req.params.customer_id;
  if (!customerId) {
    return res.status(400).json({ error: 'customer_id is required' });
  }
  Address.listAddressesByCustomer(customerId, (err, rows) => {
    if (err) return next(err);
    res.status(200).json(rows);
  });
};

exports.update = (req, res, next) => {
  const addressId = req.params.address_id;
  if (!addressId) {
    return res.status(400).json({ error: 'address_id is required' });
  }
  Address.updateAddress(addressId, req.body, (err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Address updated' });
  });
};

exports.delete = (req, res, next) => {
  const addressId = req.params.address_id;
  if (!addressId) {
    return res.status(400).json({ error: 'address_id is required' });
  }
  Address.deleteAddress(addressId, (err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Address deleted' });
  });
};