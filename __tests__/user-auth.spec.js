const request = require("supertest");
const server = require("../server");
const db = require("../database/config");
const supertest = require("supertest");

let token;

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Tests register and login", () => {
  describe("POST /register", () => {
    // Client registration tests
    it("creates a new client", async () => {
      const res = await supertest(server).post("/api/fitness/register").send({
        name: "Another Cient",
        username: "newclient",
        password: "NewPassword",
        role: "client",
      });
      expect(res.statusCode).toBe(201);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    // Existing client test
    it("rejects a registration using an existing username", async () => {
      const res = await supertest(server).post("/api/fitness/register").send({
        name: "Test Client",
        username: "existingclient1",
        password: "ClientPass1",
        role: "client",
      });
      expect(res.statusCode).toBe(409);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body.message).toBe("Username must be unique");
    });

    // Incomplete information for registration
    it("rejects a registration with missing information", async () => {
      const res = await supertest(server).post("/api/fitness/register").send({
        username: "WontRegister",
        password: "password",
        role: "client",
      });
      expect(res.statusCode).toBe(400);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body.message).toBe("Incomplete information for registration");
    });

    // Instructor registration tests
    it("creates a new instructor", async () => {
      const res = await supertest(server).post("/api/fitness/register").send({
        name: "Test Instructor",
        username: "newinstructor",
        password: "NewPassword",
        role: "instructor",
      });
      expect(res.statusCode).toBe(201);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    // Existing instructor test
    it("rejects a registration using an existing username", async () => {
      const res = await supertest(server).post("/api/fitness/register").send({
        name: "Another Name",
        username: "existinginstructor1",
        password: "instructorPass1",
        role: "instructor",
      });
      expect(res.statusCode).toBe(409);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.body.message).toBe("Username must be unique");
    });
  });

  describe("POST /login", () => {
    // Client login tests
    it("Tests clients ability to log in", async () => {
      const res = await supertest(server).post("/api/fitness/login").send({
        username: "existingclient1",
        password: "ClientPass1",
        role: "client",
      });
      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    // Instructor login tests
    it("Tests instructors ability to log in", async () => {
      const res = await supertest(server).post("/api/fitness/login").send({
        username: "existinginstructor1",
        password: "instructorPass1",
        role: "instructor",
      });
      expect(res.statusCode).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
});

describe("User route tests", () => {
  it("Tests accessibility of user routes", async () => {
    const res1 = await supertest(server).post("/api/fitness/login").send({
      username: "existingclient1",
      password: "ClientPass1",
      role: "client",
    });
    token = res1.body.token;
    const res2 = await supertest(server)
      .post("/api/fitness/classes")
      .send(setHeader("Authorization", token));
    expect(res.statusCode).toBe(200).end();
  });
});
