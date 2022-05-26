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