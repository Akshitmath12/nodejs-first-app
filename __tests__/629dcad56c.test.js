// ********RoostGPT********
/*
Test generated by RoostGPT for test aman6March using AI Type Open AI and AI Model gpt-4

ROOST_METHOD_HASH=14fde329b7
ROOST_METHOD_SIG_HASH=629dcad56c


*/

// ********RoostGPT********
import { MongoClient } from 'mongodb';

describe('Database Connection', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://127.0.0.1:27017', {
      useNewUrlParser: true,
    });
    db = await connection.db('backend');
  });

  test('should be connected to the database', async () => {
    const isConnected = db.serverConfig.isConnected();
    expect(isConnected).toBe(true);
  });

  afterAll(async () => {
    await connection.close();
  });
});