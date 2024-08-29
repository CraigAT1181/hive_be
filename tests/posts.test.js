const request = require("supertest");
const app = require("../app");
const supabase = require("../config/supabase");

// Mock Supabase
jest.mock("../config/supabase");

// Sample post data for GET /posts
const mockPosts = [
  {
    id: 1,
    user_id: 2,
    parent_id: null,
    content: "This is the first post",
    created_at: "2024-08-27T12:00:00Z",
    updated_at: "2024-08-27T12:00:00Z",
    is_reply: false,
    likes_count: 10,
    retweets_count: 2,
    page: "National Live",
    county: "Northumberland"
  },
  {
    id: 2,
    user_id: 4,
    parent_id: 1,
    content: "This is a reply to the first post",
    created_at: "2024-08-27T12:05:00Z",
    updated_at: "2024-08-27T12:05:00Z",
    is_reply: true,
    likes_count: 5,
    retweets_count: 1,
    page: "National Live",
    region: "Northumberland"
  },
  {
    id: 3,
    user_id: 6,
    parent_id: 4,
    content: "This is a reply to the reply of the first post.",
    created_at: "2024-08-27T12:10:00Z",
    updated_at: "2024-08-27T12:10:00Z",
    is_reply: true,
    likes_count: 8,
    retweets_count: 3,
    page: "National Live",
    region: "Northumberland"
  }
];


// Setup the mock for Supabase
supabase.from.mockReturnValue({
  select: () => ({
    eq: () => Promise.resolve({ data: mockPosts, error: null }),
  }),
});

describe("GET /posts", () => {
  it("should return a list of posts", async () => {
    const response = await request(app).get("/posts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("posts");
    expect(response.body.posts).toEqual(mockPosts);
  });

  it("should handle errors from Supabase", async () => {
    supabase.from.mockReturnValue({
      select: () => ({
        eq: () =>
          Promise.resolve({ data: null, error: new Error("Database error") }),
      }),
    });

    const response = await request(app).get("/posts");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Internal Server Error");
    expect(response.body.message).toBe("Database error");
  });
});


