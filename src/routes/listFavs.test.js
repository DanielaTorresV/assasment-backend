const jwt = require("jsonwebtoken");
const clonServer = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const ListFavs = require("../models/listFavs.model");
const User = require("../models/user.model");

describe("listFavs", () => {
  let user;
  let token;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();

    const data = { email: "test@test.com", password: "Abcd12345" };
    // const { body: { token } } = await req(app).post('/users/signup').send(data)
    user = await User.create(data);
    token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 365,
    });
  });

  afterAll(async () => {
    await disconnected();
  });

  it("Should not create listFavs if user is not authenticated", async () => {
    const listFavs = { name: "Music" };
    const res = await clonServer(app).post("/listsFavs/").send(listFavs);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/session expired/i);
  });

  it("Should not create listFavs if token is empty", async () => {
    const listFavs = { name: "Music" };
    const res = await clonServer(app)
      .post("/listsFavs/")
      .send(listFavs)
      .set("Authorization", "Bearer ")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/session expired/i);
  });

  it("Should not create listFavs if token is invalid", async () => {
    const listFavs = { name: "Music" };
    const res = await clonServer(app)
      .post("/listsFavs/")
      .send(listFavs)
      .set("Authorization", "Bearer 12345")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/jwt malformed/i);
  });

  it("Should create listFavs if user is authenticated", async () => {
    const listFavs = { name: "Music" };
    const res = await clonServer(app)
      .post("/listsFavs/")
      .send(listFavs)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe(listFavs.name);
    expect(res.body.data.done).toBeFalsy();
    expect(res.body.data.user).toBe(user._id.toString());
    expect(res.body.message).toMatch(/List Favs created/i);
  });

  it("Should delete list if user is authenticated and is owner", async () => {
    const data = { name: "Music" };
    const listFavs = await ListFavs.create({ ...data, user });

    const res = await clonServer(app)
      .delete(`/listsFavs/${listFavs._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/List Favs destroyed/i);
  });
});
