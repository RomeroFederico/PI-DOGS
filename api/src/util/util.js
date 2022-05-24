const { Op } = require("sequelize");
const { Raza, Temperamento } = require('../db');
const { ENDPOINT_ALL_BREEDS, ENDPOINT_SEARCH_BREEDS, IMAGE_URL_API,
			BREED_NOT_FOUND, INVALID_ID, INVALID_NAME, INSUFICIENT_DATA,
			SORT_BY_NAME, SORT_BY_WEIGTH, ASCENDING, DESCENDING,
			CONVERT_WEIGHT, CONVERT_HEIGHT, CONVERT_LB_TO_KG, CONVERT_IN_TO_CM,
			FILTER_ONLY_API, FILTER_ONLY_DB, NO_FILTER } = require('./global-constants');

const axios = require('axios');

let listBreeds = async function(name) {
	// Comprueba que el nombre sea valido.
	if (name && (/\d/.test(name) || name.length < 3)) throw new Error(INVALID_NAME);

	try {
		// Ejecuto las dos busquedas al mismo tiempo: de la API y la base de datos.
		let [ apiResult, dbResult ] = await Promise.all([listBreedsAPIPromise(name), listBreedsDBPromise(name)]);
		let allBreeds = apiResult.data.map(convertAPIBreeds).concat(dbResult.map(convertDBBreeds));

		if (name && allBreeds.length === 0) throw new Error(BREED_NOT_FOUND);

		//sortBreeds(allBreeds, SORT_BY_NAME, ASCENDING);

		return allBreeds;
	}
	catch(err) {
		throw err;
	}
}

let paginateBreeds = function(breeds, page, sortBy, order, filter) {
	if (!page) page = 1;
	if (!sortBy) sortBy = SORT_BY_NAME;
	if (!order) order = ASCENDING;
	if (!filter) filter = NO_FILTER;

	sortBy = sortBy.toUpperCase();
	order = order.toUpperCase();
	filter = filter.toUpperCase();
	
	if (filter !== NO_FILTER) breeds = breeds.filter(filterBreeds(filter));

	sortBreeds(breeds, sortBy, order);

	pages = Math.ceil(breeds.length / 8);
	breeds = breeds.slice((page - 1) * 8, page * 8);

	return { 
		breeds,
		pages
	}; 
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
		altura: fixMetrictAPI(breed.height.metric, breed.height.imperial, convertInToCm),
		añosDeVida: breed.life_span?.replace('years', 'años')
	}
}

let convertAPIBreeds = function(breed) {
	return {
		id: breed.id,
		nombre: breed.name,
		temperamento: breed.temperament,
		imagen: breed.image ? breed.image.url : breed.reference_image_id ? IMAGE_URL_API + breed.reference_image_id : null,
		peso: fixMetrictAPI(breed.weight.metric, breed.weight.imperial, convertLbToKg)
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

let sortBreeds = function(breeds, property, asc = ASCENDING) {

	breeds.sort((curr, next)=> {
		if (property === SORT_BY_NAME) return asc === DESCENDING ? sortDesc(curr.nombre, next.nombre) : sortAsc(curr.nombre, next.nombre);
		else if (asc === DESCENDING) return sortDesc(curr.peso[curr.peso.length - 1], next.peso[next.peso.length - 1]);
		else return sortAsc(curr.peso[curr.peso.length - 1], next.peso[next.peso.length - 1]);
	})
}

let sortAsc = function(current, next) {
	if (current > next) return 1;
	if (current < next) return -1;
	return 0;
}

let sortDesc = function(current, next) {
	if (current > next) return -1;
	if (current < next) return 1;
	return 0;
}

let fixMetrictAPI = function(metric, metricImperial, convertCB) {

	if (!metric && !metricImperial) return [0];

	let fixed = [0, 0]; // min y max

	if (!(/[-–]/.test(metric))) fixed[1] = isNaN(metric) ? 0 : Number(metric);
	else fixed = metric.replace(/\s/g, '').split(/[-–]/).map(w => isNaN(w) ? 0 : Number(w));

	if (fixed[0] === 0 && fixed[1] === 0 && metricImperial) 
		return fixMetrictAPI(metricImperial, null, true).map(convertCB);
	if (fixed[0] === 0) return [fixed[1]];
	if (fixed[1] === 0) return [fixed[0]];
	return fixed;
}

let convertLbToKg = function(weigthLb) {
	return Math.round(weigthLb * CONVERT_LB_TO_KG);
}

let convertInToCm = function(heightIn) {
	return Math.round(heightIn * CONVERT_IN_TO_CM);
}

let filterBreeds = function(filter) {
	if (filter === FILTER_ONLY_DB) return breed => isNaN(breed.id);
	return breed => !isNaN(breed.id);
}

module.exports = {
	listBreeds,
	getBreedById,
	listTemperaments,
	addBreed,
	paginateBreeds
}