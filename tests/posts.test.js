const request = require("supertest");
const app = require("../app");

describe("GET /posts", () => {
  it("should return a list of posts", async () => {
    const response = await request(app).get("/posts/Nation%20Live");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("posts");
    expect(response.body.posts).toHaveLength(4);
  });

  it("should return correct post structures", async () => {
    const response = await request(app).get("/posts/Nation%20Live");

    response.body.posts.forEach((post) => {
      expect(post).toHaveProperty("parent_id");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("created_at");
      expect(post).toHaveProperty("updated_at");
      expect(post).toHaveProperty("is_reply");
      expect(post).toHaveProperty("likes_count");
      expect(post).toHaveProperty("retweets_count");
      expect(post).toHaveProperty("room");
      expect(post).toHaveProperty("region");

      expect(
        typeof post.parent_id === "string" || post.parent_id === null
      ).toBe(true);
      expect(typeof post.content).toBe("string");
      expect(new Date(post.created_at).toString()).not.toBe("Invalid Date");
      expect(new Date(post.updated_at).toString()).not.toBe("Invalid Date");
      expect(typeof post.is_reply).toBe("boolean");
      expect(typeof post.likes_count).toBe("number");
      expect(typeof post.retweets_count).toBe("number");
      expect(typeof post.room).toBe("string");
      expect(typeof post.region).toBe("string");
    });
  });
});
