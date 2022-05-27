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

export const FILTER_PARAMS = {
  SORT_BY: {

    name: 'Ordenar Por',

    WEIGHT: {
      clientName: 'Peso',
      serverName: 'peso',
      imageComponent: {
        name: 'Weight',
        component: null
      }
    },

    NAME: {
      clientName: 'Nombre',
      serverName: 'nombre',
      imageComponent: {
        name: 'Name',
        component: null
      }
    }
  },

  ORDER: { 

    name: 'Orden',

    ASCENDING: {
      clientName: 'Ascendente',
      serverName: 'ascending',
      imageComponent: {
        name: 'Asc',
        component: null
      }
    },

    DESCENDING: {
      clientName: 'Descendente',
      serverName: 'Descending',
      imageComponent: {
        name: 'Desc',
        component: null
      }
    }
  },

  FILTER_ONLY: {

    name: 'Filtrar por',

    ORIGINAL: {
      clientName: 'Razas Originales',
      serverName: 'API',
      imageComponent: {
        name: 'Original',
        component: null
      }
    },

    CUSTOM: {
      clientName: 'Razas Creadas',
      serverName: 'DB',
      imageComponent: {
        name: 'New',
        component: null
      }
    },

    ALL: {
      clientName: 'Descendente',
      serverName: '',
      imageComponent: {
        name: 'All',
        component: null
      }
    },
  },
}