import { METRICS_FOR_BREEDS, FONT_SIZE } from './constants';

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
  return FONT_SIZE.SMALL;
}