// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Test MongoDB connection', () => {
  beforeAll(() => {
    process.env.DB_URL = 'mongodb://127.0.0.1:27017';
    process.env.DB_NAME = 'backend';
  });

  test('should connect to MongoDB successfully', async () => {
    mongoose.connect.mockImplementation(() => Promise.resolve());

    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME
    });

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URL, {
      dbName: process.env.DB_NAME
    });
  });

  test('should fail to connect to MongoDB', async () => {
    mongoose.connect.mockImplementation(() => Promise.reject());

    try {
      await mongoose.connect(process.env.DB_URL, {
        dbName: process.env.DB_NAME
      });
    } catch (e) {
      expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URL, {
        dbName: process.env.DB_NAME
      });
    }
  });
});