const REGEXP_EMPTY_OR_SINGLE_CHARACTER = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]?$/;
const MIN_TEMPERAMENT_LENGTH = 3;
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
const NO_MORE_THAN_ONE_SEPARATOR = /[-–\s]{2}/

export class Temperament {

  static validate(value) {
    value = this.removeSpaceFromStart(value.toUpperCase());
    if (this.checkeEmptyOrSingleCharacter(value) || (this.checkMaxLength(value) && this.checkCharacters(value))) return value;
    return false;
  }

  static checkMinLength(value) {
    return value.length >= MIN_TEMPERAMENT_LENGTH;
  }

  static checkMaxLength(value) {
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

const MIN_BREED_LENGTH = 3; // Ejemplo: Pug.
const MAX_BREED_LENGTH = 35;
const REGEXP_BREED = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/;
// Matchea solo:
// - Idem a 'temperament', pero soporta hasta 35 caracteres y se puede agregar hasta tres palabras.


export class Breed {

  static validate(value) {
    value = this.removeSpaceFromStart(value);
    if (this.checkeEmptyOrSingleCharacter(value) || (this.checkMaxLength(value) && this.checkCharacters(value))) return value;
    return false;
  }

  static checkMinLength(value) {
    return value.trim().length >= MIN_BREED_LENGTH;
  }

  static checkMaxLength(value) {
    return value.length <= MAX_BREED_LENGTH;
  }

  static checkWordsLength(value) {
    return value.split(REGEXP_SEPARATORS).every(word => word.length >= 2 || word.length === 0);
  }

  static checkFirstCharacterIsALetter(value) {
    return !REGEXP_SEPARATORS.test(value[0]);
  }

  static checkNoMoreThanOneSeparator(value) {
    return !NO_MORE_THAN_ONE_SEPARATOR.test(value);
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

export class Dog {
  constructor(name, weight, height, temperaments = [], lifespan = null) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.temperaments = temperaments;
    this.lifespan = lifespan;

    this.validName = false;
    this.validWeighAndHeight = false;
    this.validLifespan = false;
  }

  static getPropertiesNameForTabs() { // Para los 'tabs' del form de alta.
    return [{
      clientName: 'Nombre de la Raza',
      isPropertyValid: 'validName',
      imageComponentName: 'Name'
    },
    {
      clientName: 'Peso y Altura',
      isPropertyValid: 'validWeighAndHeight',
      imageComponentName: 'Rule'
    },
    {
      clientName: 'Temperamentos',
      imageComponentName: 'Temperament'
    },
    {
      clientName: 'Años de Vida',
      isPropertyValid: 'validLifespan',
      imageComponentName: 'Heart'
    }];
  }

  static getValidationRules() {
    return {
      name: [
        "El nombre debe poseer entre 3 (tres) y 35 (treinta y cinco) caracteres MAXIMO.",
        "El nombre solo puede poseer letras (incluye acentos y otras dieresis).",
        "A su vez, solo se puede incluir 3 (tres) palabras, separadas por un UNICO espacio y/o guion del medio (-–).",
        "Cada palabra debe tener 2 (dos) o mas caracteres."
      ],
      temperaments: [
        "El temperamento debe poseer entre 3 (tres) y 15 (quince) caracteres MAXIMO.",
        "El temperamento solo puede poseer letras (incluye acentos y otras dieresis).",
        "A su vez, solo se puede incluir 2 (dos) palabras, separadas por espacio y/o guion del medio (-–)",
        "Cada palabra debe tener 2 (dos) o mas caracteres.",
      ]
    }
  }

  static validateName(name) {
    if (name.length === 0) return '-';
    if (!Breed.checkFirstCharacterIsALetter(name)) return 'El primer caracter de cada palabra debe ser una letra.';
    if (!Breed.checkNoMoreThanOneSeparator(name)) return 'Se han colocado mas de un espacio seguido.'
    if (!Breed.checkMinLength(name)) return 'El nombre es demasiado corto.';
    if (!Breed.checkMaxLength(name)) return 'El nombre es demasiado largo.';
    if (!Breed.checkCharacters(name)) return 'El nombre posee caracteres invalidos.';
    if (!Breed.checkWordsLength(name)) return 'Las palabras son demaciado cortas.'
    return true;
  }

  static validateTemperament(newTemperament) {
    if (newTemperament.length === 0) return '-';
    if (!Temperament.checkMinLength(newTemperament)) return 'El temperamento es demasiado corto.';
    if (!Temperament.checkMaxLength(newTemperament)) return 'El temperamento es demasiado largo.';
    if (!Temperament.checkCharacters(newTemperament)) return 'El temperamento posee caracteres invalidos.';
    return true;
  }
}