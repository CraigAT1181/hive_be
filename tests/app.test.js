const app = require("../app.js");
const request = require("supertest");
const endpoints = require("../endpoints.json");

describe("/api", () => {
  it("should send an object with all available endpoints.", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  it("should check that all available endpoints are included.", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

