// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4-1106-preview



// ********RoostGPT********
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import request from "supertest"; // To perform API testing
import { jest } from "@jest/globals";

// Import the app from index.js for testing
import { app } from './index'; // or wherever app is exported

// Mock User model since it's used within the routes
const User = {
  findOne: jest.fn(),
  create: jest.fn()
};

// Mock bcrypt and jwt since they are external dependencies
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPasswordMock'))
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'tokenMock')
}));

describe('/register endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should redirect to login if user already exists', async () => {
    // Set up the User.findOne mock to return a user
    User.findOne.mockResolvedValue({ _id: '123', name: 'Existing User' });

    // Perform the API call
    const response = await request(app)
      .post('/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

    // Expectations
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(response.status).toBe(302); // HTTP redirect status code
    expect(response.headers.location).toBe('/login');
  });

  test('should create a new user and redirect to home', async () => {
    // Set up the User.findOne mock to return null (user not found)
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: '123', name: 'John Doe' });

    // Perform the API call
    const response = await request(app)
      .post('/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

    // Expectations
    expect(User.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPasswordMock'
    });
    expect(response.status).toBe(302); // HTTP redirect status code
    expect(response.headers.location).toBe('/');
    expect(response.headers['set-cookie'][0]).toMatch(/^token=tokenMock/);
  });

  test('should handle exceptions thrown during registration', async () => {
    // Simulate a server error during the registration process
    User.findOne.mockRejectedValue(new Error('Server error'));

    // Perform the API call
    const response = await request(app)
      .post('/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

    // Expectation
    expect(response.status).toBe(500); // HTTP internal server error status code
  });
});
