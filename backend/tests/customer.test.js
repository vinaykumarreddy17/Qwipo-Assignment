const request = require('supertest');
const app = require('../app');

describe('Customer API', () => {
  it('should create a customer', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        phone: '1234567890',
        city: 'NY',
        state: 'NY',
        pincode: '10001'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});