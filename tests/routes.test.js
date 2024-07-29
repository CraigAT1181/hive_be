const request = require('supertest');
const express = require('express');
const routes = require('../routes/api');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('GET /', () => {
    it('should return "Welcome to the Hive API Home!"', async () => {
      const response = await request(app).get('/');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Welcome to the Hive API!');
    });
  });
  
//   describe('GET /national-feed', () => {
//     it('should return "Welcome to the Hive API!"', async () => {
//       const response = await request(app).get('/api');
//       expect(response.statusCode).toBe(200);
//       expect(response.text).toBe('Welcome to the Hive API!');
//     });
//   });