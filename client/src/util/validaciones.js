const REGEXP_EMPTY_OR_SINGLE_CHARACTER = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]?$/;

const MAX_TEMPERAMENT_LENGTH = 15;
// Matchea solo:
// - Letras
// - Case-insensitive
// - Solo una letra
// - Cadena vacia.
const REGEXP_TEMPERAMENT = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/;
// Matchea solo:
// - Letras
// - Case-insensitive
// - A partir de una letra.
// - Palabras con un solo espacio o guion en el medio.
const REGEXP_SEPARATORS = /[-–\s]/;

export class Temperament {

  static validate(value) {
    value = this.removeSpaceFromStart(value.toUpperCase());
    if (this.checkeEmptyOrSingleCharacter(value) || (this.checkLength(value) && this.checkCharacters(value))) return value;
    return false;
  }

  static checkLength(value) {
    return value.length <= MAX_TEMPERAMENT_LENGTH;
  }

  static checkeEmptyOrSingleCharacter(value) {
    return REGEXP_EMPTY_OR_SINGLE_CHARACTER.test(value);
  }

  static checkCharacters(value) {
    return REGEXP_TEMPERAMENT.test(value);
  }

  static removeSpaceFromStart(value) {
    if (value.length > 0 && REGEXP_SEPARATORS.test(value[0])) value = value.slice(1);
    return value;
  }
}

const MAX_BREED_LENGTH = 35;
const REGEXP_BREED = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/;
// Matchea solo:
// - Idem a 'temperament', pero soporta hasta 35 caracteres y se puede agregar hasta tres palabras.


export class Breed {

  static validate(value) {
    value = this.removeSpaceFromStart(value);
    if (this.checkeEmptyOrSingleCharacter(value) || (this.checkLength(value) && this.checkCharacters(value))) return value;
    return false;
  }

  static checkLength(value) {
    return value.length <= MAX_BREED_LENGTH;
  }

  static checkeEmptyOrSingleCharacter(value) {
    return REGEXP_EMPTY_OR_SINGLE_CHARACTER.test(value);
  }

  static checkCharacters(value) {
    return REGEXP_BREED.test(value);
  }

  static removeSpaceFromStart(value) {
    if (value.length > 0 && REGEXP_SEPARATORS.test(value[0])) value = value.slice(1);
    return value;
  }
}