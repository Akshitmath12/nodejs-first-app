// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Database Connection', () => {
  test('should establish a connection to the database', async () => {
    const db = mongoose.connection;
    expect(db).toBeDefined();
    expect(db.readyState).toBe(1); // 1 for connected
  });

  test('should not establish a connection to the invalid database', async () => {
    await mongoose.disconnect();
    await expect(mongoose.connect('mongodb://invalid:27017', {
      dbName: "backend",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })).rejects.toThrow();
  });
});
