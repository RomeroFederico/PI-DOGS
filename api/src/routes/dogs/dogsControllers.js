const { listBreeds, addBreed } = require('../../util/util');

let getBreeds = async function (req, res, next) {
	let { name } = req.query;

	try {
		//if (name) return filterBreeds(name, res, next);

		let breeds = await listBreeds();
		return res.status(201).json(breeds);
	}
	catch(err) {
		next(err);
	}
}

let filterBreeds = function (name, res, next) {

}

let getBreedDetails = function (req, res, next) {

}

let createBreed = async function (req, res, next) {
	let { data } = req.body;

	// let data = {
	// 	oldTemperaments: [
	// 		{ nombre: "Friendly"},
	// 		{ nombre: "Loyal"}
	// 	],
	// 	newTemperaments: [
	// 		{ nombre: "Temperamento-de-prueba" },
	// 		{ nombre: "Otro-Temperamento-de-prueba" }
	// 	],
	// 	breedData: {
	// 		nombre: "prueba",
	// 		altura: "1-10",
	// 		peso: "5-15",
	// 		añosDeVida: "10-15"
	// 	}
	// }

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
	getBreedDetails,
	createBreed
}