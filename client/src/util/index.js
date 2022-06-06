import { METRICS_FOR_BREEDS, FONT_SIZE, TYPES, FILTER_PARAMS, DELAY_PAGINATE_SECTION, DEFAULT_IMAGES } from './constants';
import { Temperament, Breed } from './validaciones';

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

export function getTemperamentsFromFilters(temperaments) {
  return temperaments.split(',');
}

export function validateTemperament(value) {
  return Temperament.validate(value);
}

export function validateBreed(value) {
  return Breed.validate(value);
}

export function getPages(currentPage, pages) {
  let display = [];

  if (pages >= 4 && currentPage >= 4) display.push({ index: 1 });
  if (pages >= 5 && currentPage >= 5) display.push({ symbol: '...' });
  if (currentPage - 2 > 0) display.push({ index: currentPage - 2 });
  if (currentPage - 1 > 0) display.push({ index: currentPage - 1 });
  display.push({ index: currentPage });
  if (currentPage + 1 <= pages) display.push({ index: currentPage + 1 });
  if (currentPage + 2 <= pages) display.push({ index: currentPage + 2 });
  if (pages >= 5 && currentPage < pages - 3) display.push({ symbol: '...' });
  if (pages >= 4 && currentPage < pages - 2) display.push({ index: pages });

  return display;
}

export function checkIfExistBreedByName(breeds, name) {
  return breeds.every(b => b.nombre.toLowerCase() !== name.toLowerCase());
}

export function getDelayForPaginateAnimation() {
  return DELAY_PAGINATE_SECTION;
}

export function filterTemperaments(temperaments, search, alreadyOnFilter) {
  return temperaments.filter(t => 
    alreadyOnFilter.every(a => a !== t.nombre) &&
     (search === '' || t.nombre.toUpperCase().includes(search))
  );
}

export function filterTemperamentsHome(temperaments, search, alreadyOnFilter) {
  alreadyOnFilter = alreadyOnFilter.split(',');
  return filterTemperaments(temperaments, search, alreadyOnFilter);
}

export function filterTemperamentsForm(temperaments, search, alreadyOnFilter) {
  alreadyOnFilter = alreadyOnFilter.map(t => t.nombre);
  return filterTemperaments(temperaments, search, alreadyOnFilter);
}

export function getDefaultImages() {

  const { DEFAULT_IMAGES_COUNT, DEFAULT_IMAGES_PATH, DEFAULT_IMAGES_NAME } = DEFAULT_IMAGES; 
  const images = [];

  for(let imageIndex = 1; imageIndex <= DEFAULT_IMAGES_COUNT; imageIndex++) {
    images.push({
      name: `default-image-${imageIndex}`,
      url: `${DEFAULT_IMAGES_PATH}/${DEFAULT_IMAGES_NAME}${imageIndex}.svg`,
    });
  }

  return images; 
}