// ********RoostGPT********
// Test generated by RoostGPT for test NodeRepo using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import User from "./User"; // assuming User model is defined in the same directory
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import index from "./index"; // assuming index.js exports the app

jest.mock("mongoose");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("POST /login", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use("/", index);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return redirect to /register if email does not exist", async () => {
    mongoose.mockReturnValueOnce(null);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@test.com", password: "password" });

    expect(res.header.location).toBe("/register");
  });

  it("should return login page with error message if password is incorrect", async () => {
    const mockUser = { _id: "123", email: "test@test.com", password: "hashedpassword" };
    mongoose.mockReturnValueOnce(mockUser);
    bcrypt.compare.mockReturnValueOnce(false);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@test.com", password: "wrongpassword" });

    expect(res.text).toContain("Incorrect Password");
  });

  it("should return redirect to / if login is successful", async () => {
    const mockUser = { _id: "123", email: "test@test.com", password: "hashedpassword" };
    mongoose.mockReturnValueOnce(mockUser);
    bcrypt.compare.mockReturnValueOnce(true);
    jwt.sign.mockReturnValueOnce("token");

    const res = await request(app)
      .post("/login")
      .send({ email: "test@test.com", password: "password" });

    expect(res.header.location).toBe("/");
    expect(res.headers['set-cookie']).toContain("token=token; HttpOnly; Expires=");
  });
});
