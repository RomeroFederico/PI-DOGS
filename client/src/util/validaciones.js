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
    return value.trim().length >= MIN_TEMPERAMENT_LENGTH;
  }

  static checkMaxLength(value) {
    return value.length <= MAX_TEMPERAMENT_LENGTH;
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
      ],
      size: [
        "Los valores minimos de tanto el peso como la altura son opcionales.",
        "Se debe cumplir con el IMC (kg/0,45)/(cm/2,54) con respecto al peso.",
        "El peso maximo es de 100Kg. La altura maxima es de 100cm.",
        "El peso minimo es de 1Kg. La altura minima es de 10cm"
      ]
    }
  }

  static getminMaxValues() {
    return {
      minWeight: {
        min: 1,
        max: 100,
      },
      maxWeight: {
        min: 1,
        max: 100,
      },
      minHeight: {
        min: 10,
        max: 100,
      },
      maxHeight: {
        min: 10,
        max: 100,
      }
    };
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
    if (!Temperament.checkFirstCharacterIsALetter(newTemperament)) return 'El primer caracter de cada palabra debe ser una letra.';
    if (!Temperament.checkNoMoreThanOneSeparator(newTemperament)) return 'Se han colocado mas de un espacio seguido.'
    if (!Temperament.checkMinLength(newTemperament)) return 'El temperamento es demasiado corto.';
    if (!Temperament.checkMaxLength(newTemperament)) return 'El temperamento es demasiado largo.';
    if (!Temperament.checkCharacters(newTemperament)) return 'El temperamento posee caracteres invalidos.';
    if (!Temperament.checkWordsLength(newTemperament)) return 'Las palabras son demaciado cortas.'
    return true;
  }

  static checkIfTemperamentIsAvailable(temperaments, newTemperament) {
    newTemperament = newTemperament.toUpperCase().replace(REGEXP_SEPARATORS, ' ');
    return !temperaments.some(t => t.nombre.toUpperCase().replace(REGEXP_SEPARATORS, ' ') === newTemperament);
  }

  static formatString(value) {
    value = value.toLowerCase(); 
    let length = value.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      let characterToAdd = value[i];
      if (i === 0) result += characterToAdd.toUpperCase();
      else if (REGEXP_SEPARATORS.test(value[i - 1])) result += characterToAdd.toUpperCase(); 
      else result += characterToAdd;
    }
    return result;
  }

  static getDefaultSize() {
    return {
      minWeight: {
        hundred: "0",
        ten: "0",
        unity: "1",
        number: 1,
        nombre: 'Peso Min.',
        unidad: 'Kg',
        enabled: false,
      },
      maxWeight: {
        hundred: "0",
        ten: "0",
        unity: "1",
        number: 1,
        nombre: 'Peso Max.',
        unidad: 'Kg',
        required: true
      },
      minHeight: {
        hundred: "0",
        ten: "1",
        unity: "0",
        number: 10,
        nombre: 'Altura Min.',
        unidad: 'cm',
        enabled: false,
      },
      maxHeight: {
        hundred: "0",
        ten: "1",
        unity: "0",
        number: 10,
        nombre: 'Altura Max.',
        unidad: 'cm',
        required: true
      }  
    };
  }

  static getIMC(weight, height) {
    return (weight / 0.45) / (height / 2.54);
  }

  static getIMCValues(weight, height) {

    let imc = Dog.getIMC(weight, height);
    let max = 0.051 * weight + 1;
    let min = 0.051 * weight + 0;
    return {
      imc: imc.toFixed(2),
      max: max.toFixed(2),
      min: min.toFixed(2),
      isValid: imc <= max && imc >= min
    }
  }
}