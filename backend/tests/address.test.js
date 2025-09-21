const request = require('supertest');
const express = require('express');
const addressRoutes = require('../routes/addressRoutes');
const app = express();

app.use(express.json());
app.use('/api/addresses', addressRoutes);

describe('Address API', () => {
  let customerId = 1;
  let addressId;

  it('should create an address', async () => {
    const res = await request(app)
      .post('/api/addresses')
      .send({
        customer_id: customerId,
        address_line: '789 Test St',
        city: 'Testville',
        state: 'TS',
        pincode: '12345'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    addressId = res.body.id;
  });

  it('should fetch addresses by customer', async () => {
    const res = await request(app).get(`/api/addresses/customer/${customerId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update an address', async () => {
    const res = await request(app)
      .put(`/api/addresses/${addressId}`)
      .send({
        address_line: '789 Updated St',
        city: 'Updatedville',
        state: 'UT',
        pincode: '54321'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Address updated');
  });

  it('should delete an address', async () => {
    const res = await request(app).delete(`/api/addresses/${addressId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Address deleted');
  });
});