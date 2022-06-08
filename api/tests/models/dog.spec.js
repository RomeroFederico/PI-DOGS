const { Raza, Temperamento, conn } = require('../../src/db.js');
const { Op } = require("sequelize");
// const { expect } = require('chai');

const razaEjemplo = {
  nombre: "prueba",
  altura: [10, 30],
  peso: [5, 15],
  añosDeVida: "10-15",
  imagen: 'url'
};

describe('Raza model', () => {

  beforeAll(() => conn.authenticate()  // Primero me conecto a la base de datos y verifico la coneccion.
    .catch((err) => {
      console.error('No se pudo conectar con la Base de Datos:', err);
    })
  );

  describe('Validaciones', () => {

    beforeEach(() => Raza.sync({ force: true }));

    describe('nombre', () => {

      it('Deberia lanzar un error si el nombre es nulo', async () => {
        expect.assertions(1);
        try {
          await Raza.create({});
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si el nombre posee caracteres invalidos', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            nombre: '123ejemplo'
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si el nombre posee una cadena de mas de 35 caracteres', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            nombre: `nombre muy largoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
            oooooooooooooooooooooooooooooooooooooooooooo`
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si el nombre posee una cadena de menos de 3 caracteres', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            nombre: 'no'
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('En caso de pasar todas estas validaciones, deberia poder agregarse a la db', async () => {
        let nuevaRaza = await Raza.create({ 
          ...razaEjemplo
        });
        expect(nuevaRaza.nombre).toBe('Prueba');
        const result = await Raza.findOne({ where: { nombre: 'Prueba'} });
        expect(result.nombre).toBe('Prueba');
      });

      it('No puede ingresar otra raza con el mismo nombre', async () => {
        expect.assertions(1);
        try {
          let nuevaRaza = await Raza.create({ 
            ...razaEjemplo
          });
          let otraRaza = await Raza.create({ 
            ...razaEjemplo
          });
        }
        catch(error) {
          expect(error.message).toBeDefined();
        }
      });

    });

    describe('Peso y Altura', () => {

      it('Deberia lanzar un error si el peso o la altura son nulos', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ nombre: 'pruebapesonulo', añosDeVida: '10'});
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si los mismos no son un array', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            peso: 15
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('El array debe contener solo numeros', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            altura: ['uno', 2]
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Tampoco puede poseer mas de 2 valores', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            altura: [1, 2, 3, 5]
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Ni tampoco puede poseer menos de un valor', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            altura: []
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Los valores no pueden estar fuera del rango', async () => {
        expect.assertions(1);
        try {
          await Raza.create({ 
            ...razaEjemplo,
            altura: [-1, 200]
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

    });

    describe('Relaciones', () => {

      it('Deberia poder relacionarse a los temperamentos a traves de la FK en la tabla de transaccion', async () => {

        let nuevaRaza = await Raza.create({ 
          ...razaEjemplo
        });
        expect(nuevaRaza.nombre).toBe('Prueba');

        await Temperamento.create({
          nombre: 'prueba uno'
        });

        await Temperamento.create({
          nombre: 'prueba dos'
        });

        const temperamentsToAdd = await Temperamento.findAll({ where: { nombre: {[Op.iLike]: '%prueba%' } } });
        expect(temperamentsToAdd.length).toBe(2);

        await nuevaRaza.addTemperamentos(temperamentsToAdd);

        let nuevaRazaWithTemperaments = await Raza.findOne({
          where: {
            nombre: 'Prueba'
          }, 
          include: [{
            model: Temperamento,
            as: 'temperamentos'
          }]
        });

        expect(nuevaRazaWithTemperaments.temperamentos.length).toBe(2);
      });


    });

  });

  afterAll(() => {
    conn.close();
  })

});