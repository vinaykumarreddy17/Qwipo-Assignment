const db = require('../db');

exports.createCustomer = (data, cb) => {
  const { first_name, last_name, phone, city, state, pincode } = data;
  if (!first_name || !last_name || !phone || !city || !state || !pincode) {
    return cb(new Error('Missing required customer fields'));
  }
  db.run(
    `INSERT INTO customers (first_name, last_name, phone, email, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, phone, data.email || null, city, state, pincode],
    function (err) { cb(err, this ? this.lastID : null); }
  );
};

exports.getCustomerById = (id, cb) => {
  db.get(`SELECT * FROM customers WHERE id = ?`, [id], cb);
};

exports.updateCustomer = (id, data, cb) => {
  const { first_name, last_name, phone, city, state, pincode, only_one_address } = data;
  if (!first_name || !last_name || !phone || !city || !state || !pincode) {
    return cb(new Error('Missing required customer fields'));
  }
  db.run(
    `UPDATE customers SET first_name=?, last_name=?, phone=?, city=?, state=?, pincode=?, only_one_address=? WHERE id=?`,
    [first_name, last_name, phone, city, state, pincode, only_one_address || null, id],
    function (err) { cb(err, this ? this.changes : 0); }
  );
};

exports.deleteCustomer = (id, cb) => {
  db.run(`DELETE FROM customers WHERE id = ?`, [id], function (err) { cb(err, this ? this.changes : 0); });
};

exports.listCustomers = (filters, cb) => {
  let query = 'SELECT * FROM customers';
  const params = [];
  const conditions = [];

  if (filters.city) {
    conditions.push('city = ?');
    params.push(filters.city);
  }
  if (filters.state) {
    conditions.push('state = ?');
    params.push(filters.state);
  }
  if (filters.pincode) {
    conditions.push('pincode = ?');
    params.push(filters.pincode);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  db.all(query, params, cb);
};