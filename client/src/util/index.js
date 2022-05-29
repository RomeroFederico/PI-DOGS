import { METRICS_FOR_BREEDS, FONT_SIZE, TYPES, FILTER_PARAMS } from './constants';
import { Temperament } from './validaciones';

export function getBreedSize (weight) {
  let sizes = Object.keys(METRICS_FOR_BREEDS);
  let findSize = sizes.find(s => weight <= METRICS_FOR_BREEDS[s].maxWeight);

  if (findSize) return METRICS_FOR_BREEDS[findSize].name;
  return false;
}

export function fitSentence (sentence) {
  if (sentence.length < 15) return FONT_SIZE.TITLE;
  if (sentence.length < 20) return FONT_SIZE.SUBTITLE;
  if (sentence.length < 25) return FONT_SIZE.MEDIUM;
  if (sentence.length < 35) return FONT_SIZE.SMALL;
  return FONT_SIZE.SMALLEST;
}

export function getType (id) {
  id = id.toString();
  let types = Object.keys(TYPES);
  let findType = types.find(t => TYPES[t].regexp.test(id));

  if (findType) return TYPES[findType].name;
  return "";
}

export function getFilters () {
  return FILTER_PARAMS;
}

export function getImageComponent(option, imageComponents) {
  let findComponent = imageComponents.find(i => i.name === option.imageComponentName);
  if (findComponent) return findComponent.component;
  return false;
}

export function validateTemperament(value) {
  return Temperament.validate(value);
}

export function filterTemperaments(temperaments, search) {
  if (search === '') return temperaments;
  return temperaments.filter(t => t.nombre.toUpperCase().includes(search));
}