// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import express from "express";

const app = express();
let server;

describe("Server", () => {
  beforeAll((done) => {
    server = app.listen(5000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("should start server at port 5000", (done) => {
    const requestOptions = {
      host: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET'
    };
    
    const request = http.request(requestOptions, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
    
    request.on('error', (error) => {
      console.error(`Problem with request: ${error.message}`);
    });
    
    request.end();
  });

  test("should fail to start server at port 5001", (done) => {
    const requestOptions = {
      host: 'localhost',
      port: 5001,
      path: '/',
      method: 'GET'
    };
    
    const request = http.request(requestOptions, (response) => {
      expect(response.statusCode).not.toBe(200);
      done();
    });
    
    request.on('error', (error) => {
      console.error(`Problem with request: ${error.message}`);
    });
    
    request.end();
  });
});
