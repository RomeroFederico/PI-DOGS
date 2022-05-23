const { Op } = require("sequelize");
const { Raza, Temperamento } = require('../db');
const { ENDPOINT_ALL_BREEDS, ENDPOINT_SEARCH_BREEDS } = require('./global-constants');

const axios = require('axios');

let listBreeds = async function(name) {
	let api = axios(ENDPOINT_ALL_BREEDS);
	let db = Raza.findAll({
		include: [{
    	model: Temperamento,
    	as: 'temperamentos'
  	}]
  });

	try {
		let [ apiResult, dbResult ] = await Promise.all([api, db]);
		let allBreeds = apiResult.data.map(convertAPIBreeds).concat(dbResult.map(convertDBBreeds));

		if (!name) return allBreeds;

		name = name.toUpperCase();
		let filtered = filterBreedsByName(allBreeds, name);
		if (filtered.length === 0) throw new Error('Breed not found');
		return filtered;
	}
	catch(err) {
		throw err;
	}
}

let getBreedById = async function(id) {
	if (!id || id === '') throw new Error('Invalid id');

	let breedsToSearch;

	if (isNaN(id)) {

		id = Number(id.replace('C', ''));

		if (isNaN(id)) throw new Error('Invalid id');

		let breed = await Raza.findOne({
			where: {
				id: id
			},
			include: [{
	    	model: Temperamento,
	    	as: 'temperamentos'
	  	}]
	  });

	  if (!breed) throw new Error('Breed not found');
	  return breed;
	}

	id = Number(id);

	let breeds = await axios.get(ENDPOINT_ALL_BREEDS);
	let breed = breeds.data.find(b => b.id === id);

	if (!breed) throw new Error('Breed not found');
	return breed;
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

let filterBreedsByName = function(breeds, name) {
	return breeds.filter(breed => breed.nombre.toUpperCase().includes(name));
}

let listTemperaments = async function() {
	try {
		return await Temperamento.findAll();
	}
	catch(err) {
		throw err;
	}
}

module.exports = {
	listBreeds,
	getBreedById,
	listTemperaments,
	addBreed
}