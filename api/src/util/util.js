const { Op } = require("sequelize");
const { Raza, Temperamento } = require('../db');
const { ENDPOINT_ALL_BREEDS, ENDPOINT_SEARCH_BREEDS } = require('./global-constants');

const axios = require('axios');

let listBreeds = async function() {
	let api = axios(ENDPOINT_ALL_BREEDS);
	let db = Raza.findAll({
		include: [{
    	model: Temperamento,
    	as: 'temperamentos'
  	}]
  });

	try {
		let [ apiResult, dbResult ] = await Promise.all([api, db]);
		return apiResult.data.map(convertAPIBreeds).concat(dbResult.map(convertDBBreeds));
	}
	catch(err) {
		throw err;
	}
}

let addBreed = async function(data) {

	if (!data || !data.breedData) throw new Error("insuficient data to make a new breed");

	let { oldTemperaments, newTemperaments, breedData } = data;

	try {

		let newBreedRef = await Raza.create(breedData);

		let newTempPromise = newTemperaments ? Temperamento.bulkCreate(newTemperaments) : [];
		let oldTempPromise = oldTemperaments ? Temperamento.findAll({ where: { [Op.or]: oldTemperaments }}) : [];
		let [ newTempReference, oldTempReference ] = await Promise.all([newTempPromise, oldTempPromise]);

		await newBreedRef.addTemperamentos(newTempReference.concat(oldTempReference));

		return newBreedRef;
	}
	catch(err) {
		throw err;
	}	
}

let convertAPIBreeds = function(breed) {
	return {
		id: breed.id,
		nombre: breed.name,
		temperamento: breed.temperament,
		imagen: breed.image.url,
		peso: breed.weight.imperial 
	};
}

let convertDBBreeds = function(breed) {
	return {
		...breed.cardDetails,
		temperamento: breed.temperamentos.map(t => t.nombre).join(", ")
	}
}

module.exports = {
	listBreeds,
	addBreed
}