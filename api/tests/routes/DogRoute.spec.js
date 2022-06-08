const request = require('supertest');
const server = require('../../src/app.js');

const data = {
  oldTemperaments: [
    { nombre: "Friendly"},
    { nombre: "Loyal"}
  ],
  newTemperaments: [
    { nombre: "pruebarouteuno" },
    { nombre: "pruebaroutedos" }
  ],
  breedData: {
    nombre: "prueba",
    altura: [10, 30],
    peso: [5, 15],
    añosDeVida: "10-15",
    imagen: 'url'
  }
};

describe('Rutas: /dogs', () => {

  describe('GET /', () => {

    it('Deberia retornar todas las razas registrados en la API.', async () => {
      const res = await request(server).get('/dogs');

      expect(res.statusCode).toBe(201);

      expect(res.body[0].nombre).toBe("Affenpinscher");
      expect(res.body[res.body.length - 1].id).toBe(264);
    });
  })

  describe('GET /page/:page', () => {

    it('Deberia retornar las raza paginadas.', async () => {
      const res = await request(server).get('/dogs/page/1');

      expect(res.statusCode).toBe(201);

      expect(res.body.breeds.length).toBe(8);
      expect(res.body.breeds[7].nombre).toBe("Alaskan Husky");
    });

    it('Deberia retornar las raza paginadas de acuerdo al filtro.', async () => {
      const res = await request(server).get('/dogs/page/1?temperaments=playful');

      expect(res.statusCode).toBe(201);

      expect(res.body.breeds.length).toBe(8);
      expect(res.body.breeds[7].nombre).toBe("Chinese Crested");
      expect(res.body.pages).toBe(5);
    });
  })

  describe('GET /:idRaza', () => {

    it('Deberia retornar la raza asociada al idRaza.', async () => {
      const res = await request(server).get('/dogs/55');

      expect(res.statusCode).toBe(201);

      expect(res.body.nombre).toBe('Boxer');
      expect(res.body.añosDeVida).toBe("8 - 10 años");
    });

    it('Deberia retornar un objeto conteniendo un error si no se encuentra una raza', async () => {
      const res = await request(server).get('/dogs/500');

      expect(res.statusCode).toBe(500);

      expect(res.body.error).toBe(true);
      expect(res.body.msg).toBe('Breed not found');
    });
  });

  describe('POST /create', () => {

    it('Deberia retornar un objeto conteniendo un error si no se envian los parametros necesarios', async () => {
      const res = await request(server).post('/dogs/create')
                                       .send({
                                              data: { 
                                                ...data,
                                                breedData: {
                                                  ...data.breedData,
                                                  nombre: null,
                                                } 
                                            }});

      expect(res.statusCode).toBe(500);
    });

    it('Deberia poder registrarlo si los datos provistos son correctos.', async () => {
      const res = await request(server).post('/dogs/create')
                                       .send({ data: { ...data } });
      expect(res.statusCode).toBe(201);
      expect(res.body.sucess).toBe(true);
    });

  });


})