const app = require("../app.js");
const request = require("supertest");
const endpoints = require("../endpoints.json");

describe("/api", () => {
  test("Should send an object with all available endpoints (GET 200).", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("Should check that all available endpoints are included.", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});
