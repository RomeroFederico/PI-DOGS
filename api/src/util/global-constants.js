const { API_KEY } = require('../db');

const ENDPOINT_ALL_BREEDS = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const ENDPOINT_SEARCH_BREEDS = `https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=`;
const IMAGE_URL_API = 'https://cdn2.thedogapi.com/images/';
const BREED_NOT_FOUND = 'Breed not found';
const INVALID_ID = 'Invalid id';
const INVALID_NAME = 'Invalid name';
const INSUFICIENT_DATA = 'Insuficient data';

module.exports = {
	ENDPOINT_ALL_BREEDS,
	ENDPOINT_SEARCH_BREEDS,
	IMAGE_URL_API,
	BREED_NOT_FOUND,
	INVALID_ID,
	INVALID_NAME,
	INSUFICIENT_DATA
}