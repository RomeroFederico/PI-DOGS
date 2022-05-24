const { listBreeds, addBreed, getBreedById, paginateBreeds } = require('../../util/util');

let getBreeds = async function (req, res, next) {
	let { name } = req.query;

	try {
		let breeds = await listBreeds(name);
		return res.status(201).json(breeds);
	}
	catch(err) {
		next(err);
	}
}

let getBreedsByPage = async function(req, res, next) {
	let { page } = req.params;
	let { sort, order, filter } = req.query;

	try {
		let breeds = await listBreeds();
		let result = paginateBreeds(breeds, page, sort, order, filter);
		return res.status(201).json(result);
	}
	catch(err) {
		next(err);
	}
}

let getBreedDetails = async function (req, res, next) {
	let { idRaza } = req.params;

	try {
		let breed = await getBreedById(idRaza);
		return res.status(201).json(breed);
	}
	catch(err) {
		next(err);
	}
}

let createBreed = async function (req, res, next) {
	//let { data } = req.body;

	let data = {
		oldTemperaments: [
			{ nombre: "Friendly"},
			{ nombre: "Loyal"}
		],
		newTemperaments: [
			{ nombre: "Temperamento-de-prueba" },
			{ nombre: "Otro-Temperamento-de-prueba" }
		],
		breedData: {
			nombre: "prueba",
			altura: [1, 10],
			peso: [5, 15],
			añosDeVida: "10-15"
		}
	}

	try {
		let result = await addBreed(data);
		res.status(201).json({sucess: true, result: result});
	}
	catch(err) {
		next(err);
	}
}

module.exports = {
	getBreeds,
	getBreedsByPage,
	getBreedDetails,
	createBreed
}