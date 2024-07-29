const request = require('supertest');
const app = require('../app');
const supabase = require('../config/supabase');

// Mock Supabase
jest.mock('../config/supabase');

// Sample user data
const mockUsers = [
  { id: 1, full_name: 'John Doe', handle: 'john_doe', email: 'john.doe@example.com', telephone: '07123456789', profile_pic: 'https://example.com/john.jpg', birthday: '1980-01-01', bio: 'Sample bio', country: 'UK', city: 'London', county: 'Greater London', follower_count: 100, following_count: 50, post_count: 10, last_login: '2024-07-01T00:00:00Z', status: 'active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z', is_verified: true, is_test_data: true }
];

// Setup the mock for Supabase
supabase.from.mockReturnValue({
  select: () => ({
    eq: () => Promise.resolve({ data: mockUsers, error: null })
  })
});

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body.users).toEqual(mockUsers);
  });

  it('should handle errors from Supabase', async () => {
    supabase.from.mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: null, error: new Error('Database error') })
      })
    });

    const response = await request(app).get('/users');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal Server Error');
    expect(response.body.message).toBe('Database error');
  });
});
