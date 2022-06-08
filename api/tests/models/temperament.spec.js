const { Temperamento, conn } = require('../../src/db.js');
// const { expect } = require('chai');

describe('Temperamento model', () => {

  beforeAll(() => conn.authenticate()  // Primero me conecto a la base de datos y verifico la coneccion.
    .catch((err) => {
      console.error('No se pudo conectar con la Base de Datos:', err);
    })
  );

  describe('Validaciones', () => {

    beforeEach(() => Temperamento.sync({ force: true }));

    describe('nombre', () => {

      it('Deberia lanzar un error si el nombre es nulo', async () => {
        expect.assertions(1);
        try {
          await Temperamento.create({});
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si el nombre posee caracteres invalidos', async () => {
        expect.assertions(1);
        try {
          await Temperamento.create({ 
            nombre: '123ejemplo'
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si el nombre posee una cadena de mas de 15 caracteres', async () => {
        expect.assertions(1);
        try {
          await Temperamento.create({ 
            nombre: `nombre muy largoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo`
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('Deberia lanzar un error si el nombre posee una cadena de menos de 3 caracteres', async () => {
        expect.assertions(1);
        try {
          await Temperamento.create({ 
            nombre: 'no'
          });
        }
        catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('En caso de pasar todas estas validaciones, deberia poder agregarse a la db', async () => {
        let nuevoTemperamento = await Temperamento.create({ 
          nombre: 'Prueba Temp',
        });
        expect(nuevoTemperamento.nombre).toBe('Prueba Temp');
        const result = await  Temperamento.findOne({ where: { nombre: 'Prueba Temp'} });
        expect(result.nombre).toBe('Prueba Temp');
      });

      it('No puede ingresar otro temperamento con el mismo nombre', async () => {
        expect.assertions(1);
        try {
          let nuevoTemperamento = await Temperamento.create({ 
            nombre: 'mismo nombre'
          });
          let nuevoTemperamentoDos = await Temperamento.create({ 
            nombre: 'mismo nombre'
          });
        }
        catch(error) {
          expect(error.message).toBeDefined();
        }
      });

    });

  });

});
