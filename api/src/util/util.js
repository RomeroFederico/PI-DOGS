const { Op } = require("sequelize");
const { Raza, Temperamento } = require('../db');
const { ENDPOINT_ALL_BREEDS, ENDPOINT_SEARCH_BREEDS, IMAGE_URL_API,
			BREED_NOT_FOUND, INVALID_ID, INVALID_NAME, INSUFICIENT_DATA } = require('./global-constants');

const axios = require('axios');

let listBreeds = async function(name) {

	// Comprueba que el nombre sea valido.
	if (name && (/\d/.test(name) || name.length < 3)) throw new Error(INVALID_NAME);

	try {
		// Ejecuto las dos busquedas al mismo tiempo: de la API y la base de datos.
		let [ apiResult, dbResult ] = await Promise.all([listBreedsAPIPromise(name), listBreedsDBPromise(name)]);
		let allBreeds = apiResult.data.map(convertAPIBreeds).concat(dbResult.map(convertDBBreeds));

		if (name && allBreeds.length === 0) throw new Error(BREED_NOT_FOUND);
		return allBreeds;
	}
	catch(err) {
		throw err;
	}
}

let getBreedById = async function(id) {
	// Comprueba que el id sea un numero o un numero + c (custom).
	if (!(/^[0-9]+c?$/i.test(id))) throw new Error(INVALID_ID);

	try {
		let breedFound = isNaN(id) ? await findBreedByIdDB(id) : await findBreedByIdAPI(id);

		if (!breedFound) throw new Error(BREED_NOT_FOUND);
		if (isNaN(id)) return convertDBBreedsDetails(breedFound);
		return ConverApiBreedsDetails(breedFound);
	}
	catch(err) {
		throw err;
	}
}

let listTemperaments = async function() {
	try {
		return await Temperamento.findAll();
	}
	catch(err) {
		throw err;
	}
}

let addBreed = async function(data) {

	if (!data || !data.breedData) throw new Error(INSUFICIENT_DATA);

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

let ConverApiBreedsDetails = function(breed) {
	return {
		...convertAPIBreeds(breed),
		altura: breed.weight.imperial,
		añosDeVida: breed.life_span?.replace('years', 'años')
	}
}

let convertAPIBreeds = function(breed) {
	return {
		id: breed.id,
		nombre: breed.name,
		temperamento: breed.temperament,
		imagen: breed.image ? breed.image.url : breed.reference_image_id ? IMAGE_URL_API + breed.reference_image_id : null,
		peso: breed.weight.imperial 
	};
}

convertDBBreedsDetails = function(breed) {
	return {
		...convertDBBreeds(breed),
		altura: breed.altura,
		añosDeVida: breed.añosDeVida
	}
}

let convertDBBreeds = function(breed) {
	return {
		...breed.cardDetails,
		temperamento: breed.temperamentos.map(t => t.nombre).join(", ")
	}
}

let listBreedsDBPromise = function(name) {
	return Raza.findAll({
		where: {
			nombre: {
				[Op.iLike]: name ? `%${name}%` : '%%'
			}
		},
		include: [{
    	model: Temperamento,
    	as: 'temperamentos'
  	}]
  });
}

let listBreedsAPIPromise = function(name) {
	return axios.get(name ? ENDPOINT_SEARCH_BREEDS + name : ENDPOINT_ALL_BREEDS);
}

let findBreedByIdDB = async function(id) {
	id = Number(id.replace(/c/i, ''));
	return await Raza.findOne({
		where: {
			id: id
		},
		include: [{
    	model: Temperamento,
    	as: 'temperamentos'
  	}]
  });
}

let findBreedByIdAPI = async function(id) {
	id = Number(id);
	let breeds = await axios.get(ENDPOINT_ALL_BREEDS);
	return breeds.data.find(b => b.id === id);
}

module.exports = {
	listBreeds,
	getBreedById,
	listTemperaments,
	addBreed
}