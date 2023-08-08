/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

const { DB_HOST } = process.env;

describe("POST /api/users/login ", () => {
  let server;
  const testUser = { email: "test@gmail.com", password: "test123456" };

  beforeAll(async () => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(3001);
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
    await request(app).post("/api/users/register").send(testUser);
  });

  afterAll(async () => {
    await User.findOneAndDelete(testUser.email);
    await mongoose.disconnect();
    server.close();
  });

  it("should return status 200", async () => {
    const res = await request(app).post("/api/users/login").send(testUser);
    expect(res.statusCode).toBe(200);
  });

  it("should return token", async () => {
    const res = await request(app).post("/api/users/login").send(testUser);
    expect(res.body.token).toBeDefined();
  });

  it("should return user", async () => {
    const res = await request(app).post("/api/users/login").send(testUser);
    expect(res.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
