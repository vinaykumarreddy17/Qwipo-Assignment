const db = require('../db');

exports.createAddress = (data, cb) => {
  const { customer_id, address_line, city, state, pincode } = data;
  if (!customer_id || !address_line || !city || !state || !pincode) {
    return cb(new Error('Missing required address fields'));
  }
  db.run(
    `INSERT INTO addresses (customer_id, address_line, city, state, pincode) VALUES (?, ?, ?, ?, ?)`,
    [customer_id, address_line, city, state, pincode],
    function (err) { cb(err, this ? this.lastID : null); }
  );
};

exports.listAddressesByCustomer = (customer_id, cb) => {
  db.all(`SELECT * FROM addresses WHERE customer_id = ?`, [customer_id], cb);
};

exports.updateAddress = (id, data, cb) => {
  db.run(
    `UPDATE addresses SET address_line=?, city=?, state=?, pincode=? WHERE id=?`,
    [data.address_line, data.city, data.state, data.pincode, id],
    function (err) { cb(err, this ? this.changes : 0); }
  );
};

exports.deleteAddress = (id, cb) => {
  db.run(`DELETE FROM addresses WHERE id=?`, [id], function (err) { cb(err, this ? this.changes : 0); });
};