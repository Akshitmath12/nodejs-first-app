// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import request from "supertest";
import { server } from './index.js'; // assuming server is exported from index.js
import User from './User.js'; // assuming User model is exported from User.js

describe("POST /register", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/testDatabase", { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a new user and return cookie", async () => {
    const res = await request(server)
      .post("/register")
      .send({
        name: "testUser",
        email: "testEmail@test.com",
        password: "testPassword"
      });
    const user = await User.findOne({ email: "testEmail@test.com" });
    expect(user).toBeDefined();
    expect(res.header['set-cookie']).toBeDefined();
  });

  test("should not create a new user if email already exists", async () => {
    await User.create({
      name: "existingUser",
      email: "existingEmail@test.com",
      password: "existingPassword"
    });

    const res = await request(server)
      .post("/register")
      .send({
        name: "newUser",
        email: "existingEmail@test.com",
        password: "newPassword"
      });

    expect(res.header.location).toEqual("/login");
  });
});
