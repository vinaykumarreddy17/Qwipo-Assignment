const Customer = require('../models/customer');

exports.create = (req, res, next) => {
  const { first_name, last_name, phone, city, state, pincode } = req.body;
  if (!first_name || !last_name || !phone || !city || !state || !pincode) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  Customer.createCustomer(req.body, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Customer created', id });
  });
};

exports.read = (req, res, next) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({ error: 'Customer id is required.' });
  }
  Customer.getCustomerById(customerId, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: 'Customer not found.' });
    res.status(200).json(row);
  });
};

exports.update = (req, res, next) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({ error: 'Customer id is required.' });
  }
  Customer.updateCustomer(customerId, req.body, (err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Customer updated' });
  });
};

exports.delete = (req, res, next) => {
  const customerId = req.params.id;
  if (!customerId) {
    return res.status(400).json({ error: 'Customer id is required.' });
  }
  Customer.deleteCustomer(customerId, (err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Customer deleted' });
  });
};

exports.list = (req, res, next) => {
  Customer.listCustomers(req.query, (err, rows) => {
    if (err) return next(err);
    res.status(200).json(rows);
  });
};