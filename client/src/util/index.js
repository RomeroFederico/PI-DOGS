import { METRICS_FOR_BREEDS, FONT_SIZE, TYPES, FILTER_PARAMS } from './constants';

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

export function mapComponents (filterParams, currentComponent) {
  let params = Object.keys(filterParams);
  let imageComponentParams = params.reduce((acum, param) => {
    let subParam = Object.keys(filterParams[param]);
    subParam = subParam.filter(p => p !== 'name');
    acum = acum.concat(subParam.map(s => filterParams[param][s].imageComponent));
    return acum;
  }, []);
  let findComponent = imageComponentParams.find(i => i.name === currentComponent.name);
  if (findComponent) findComponent.component = currentComponent.component;
  return filterParams;
}