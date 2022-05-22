const { Temperamento } = require('../db');
const { ENDPOINT_ALL_BREEDS } = require('./global-constants');

const axios = require('axios');

let preloadTemperamentos = async function() {
	try {
		let result = await existTemperamentsInDB();		// Verifico si ya estan cargados en la base.
		if (!result) getTemperamentosFromAPI();				// Llamo a la API solo si no estan cargados.
	}
	catch(err) {
		throw err;																		// Si surge cualquier error cierro el servidor.
	}
}

let existTemperamentsInDB = async function() {
	try {
		let cont = await Temperamento.count();
		return cont > 0 ? true : false;
	}
	catch(err){
		throw new Error("DATABASE ERROR IN <existTemperamentsInDB>");
	}
}

let getTemperamentosFromAPI = function () {
	axios.get(ENDPOINT_ALL_BREEDS)
	.then(res => res.data)
	.then(breeds => filterTemperamentos(breeds))
	.then(temperamentos => Temperamento.bulkCreate(temperamentos))
	.then(result => console.log("Temperamentos cargados con exito."))
	.catch(err => {
		throw new Error("ERROR IN <getTemperamentosFromAPI>");
	});
}

let filterTemperamentos = function (breeds) {
	let temperamentos = {};

	breeds.forEach(b => 
		b.temperament?.replace(/\s/g, "").split(',').forEach(t => {
			if (!temperamentos[t]) temperamentos[t] = true
		})
	);

	return Object.keys(temperamentos).map(t => { return { nombre: t } });
}

module.exports = {
	preloadTemperamentos
}