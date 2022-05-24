const { API_KEY } = require('../db');

const ENDPOINT_ALL_BREEDS = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const ENDPOINT_SEARCH_BREEDS = `https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=`;
const IMAGE_URL_API = 'https://cdn2.thedogapi.com/images/';

const BREED_NOT_FOUND = 'Breed not found';
const INVALID_ID = 'Invalid id';
const INVALID_NAME = 'Invalid name';
const INSUFICIENT_DATA = 'Insuficient data';

const SORT_BY_NAME = 'NOMBRE';
const SORT_BY_WEIGTH = 'PESO';

const ASCENDING = 'ASCENDING';
const DESCENDING = 'DESCENDING';

const CONVERT_WEIGHT = "CONVERT_WEIGTH";
const CONVERT_HEIGHT = "CONVER_HEIGHT";
const CONVERT_LB_TO_KG = 0.4536;
const CONVERT_IN_TO_CM = 2.54; 

const FILTER_ONLY_API = "API";
const FILTER_ONLY_DB = "DB";
const NO_FILTER = 'NONE';

/* 
	1 lb === 0.4536 kg
	1 in === 2.54 cm
*/

module.exports = {
	ENDPOINT_ALL_BREEDS,
	ENDPOINT_SEARCH_BREEDS,
	IMAGE_URL_API,
	BREED_NOT_FOUND,
	INVALID_ID,
	INVALID_NAME,
	INSUFICIENT_DATA,
	SORT_BY_NAME,
	SORT_BY_WEIGTH,
	ASCENDING,
	DESCENDING,
	CONVERT_WEIGHT,
	CONVERT_HEIGHT,
	CONVERT_LB_TO_KG,
	CONVERT_IN_TO_CM,
	FILTER_ONLY_API,
	FILTER_ONLY_DB,
	NO_FILTER
}