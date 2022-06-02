import { Param, Option } from './classes'; 

export const METRICS_FOR_BREEDS = {

  X_SMALL_RACE: {
    maxWeight: 9,
    name: 'Extra-Small' 
  },

  SMALL_RACE: {
    maxWeight: 14,
    name: 'Small' 
  },

  MEDIUM_RACE: {
    maxWeight: 22,
    name: 'Medium' 
  },

  LARGE_RACE: {
    maxWeight: 41,
    name: 'Large' 
  },

  X_LARGE_RACE: {
    maxWeight: 120,
    name: 'Extra-Large'
  }
}

export const FONT_SIZE = {
  SMALLEST: 'SMALLEST',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  SUBTITLE: 'SUBTITLE',
  TITLE: 'TITLE',
}

export const TYPES = {
  CUSTOM: {
    name: 'Original',
    regexp: /^[0-9]+$/
  },

  ORIGINAL:{
    name: 'Custom',
    regexp: /^[0-9]+c?$/i
  } 
}

// FILTER PARAMS FOR THE HOME
const WEIGHT = Option.create('WEIGHT', 'Peso', 'peso', 'Weight');
const NAME = Option.create('NAME', 'Nombre', 'nombre', 'Name');
const ASCENDING = Option.create('ASCENDING', 'Ascendente', 'ascending', 'Asc');
const DESCENDING = Option.create('DESCENDING', 'Descendente', 'descending', 'Desc');
const ORIGINAL = Option.create('ORIGINAL', 'Originales', 'API', 'Original');
const CUSTOM = Option.create('CUSTOM', 'Creadas', 'DB', 'New');
const ALL = Option.create('ALL', 'Todas', '', 'All');

const SORT_BY = new Param('Ordenar por', 'sort', [WEIGHT, NAME]);
const ORDER = new Param('Orden', 'order', [ASCENDING, DESCENDING]);
const FILTER_ONLY = new Param('Filtrar por Razas', 'filter', [ALL, ORIGINAL, CUSTOM]);

export const FILTER_PARAMS = [
  SORT_BY,
  ORDER,
  FILTER_ONLY
];

// CONSTANTS FOR THE FILTERING OF LOCAL BREEDS

export const FILTER_CONSTANTS = {
  SORT_BY_NAME: 'NOMBRE',
  SORT_BY_WEIGTH: 'PESO',
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
  FILTER_ONLY_API: "API",
  FILTER_ONLY_DB: "DB",
  NO_FILTER: 'NONE',
  FILTER_ONLY_DB_TEMP: "DB+TEMP",
  FILTER_ONLY_API_TEMP: "API+TEMP",
  FILTER_ONLY_TEMP: "TEMP",
  TEMPERAMENTS_SEPARATOR: ","
}

// DELAY NECESARIO PARA QUE FUNCIONE EL PAGINADO ENTRE SECCIONES EN EL FORM DE CREAR UNA RAZA.

export const DELAY_PAGINATE_SECTION = 500;