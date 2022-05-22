const { API_KEY } = require('../db');

const ENDPOINT_ALL_BREEDS = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const ENDPOINT_SEARCH_BREEDS = 'https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY';

module.exports = {
	ENDPOINT_ALL_BREEDS,
	ENDPOINT_SEARCH_BREEDS
}