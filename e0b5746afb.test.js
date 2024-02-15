// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import request from 'supertest';
import app from '../index';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

describe('POST /register', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(302);
    expect(res.headers['location']).toBe('/');
    const user = await User.findOne({ email: 'test@gmail.com' });
    expect(user).toBeTruthy();
    const passwordMatch = await bcrypt.compare('password123', user.password);
    expect(passwordMatch).toBeTruthy();
  });

  it('should not register a user with an existing email', async () => {
    await User.create({
      name: 'Test User',
      email: 'test@gmail.com',
      password: await bcrypt.hash('password123', 10)
    });
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User 2',
        email: 'test@gmail.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(302);
    expect(res.headers['location']).toBe('/login');
  });
});
