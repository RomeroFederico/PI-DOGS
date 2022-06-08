const request = require('supertest');
const server = require('../../src/app.js');

describe('Rutas: /temperament', () => {

  describe('GET /', () => {

    it('Deberia retornar todos los temperamentos registrados en la API (124) en la base de datos', async () => {
      const res = await request(server).get('/temperament');

      expect(res.statusCode).toBe(201);

      expect(res.body.length).toBe(124);
    });
  })
})