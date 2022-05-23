const { listTemperaments } = require('../../util/util');

let getTemperaments = async function (req, res, next) {
	try {
		let temperaments = await listTemperaments();
		res.status(201).json(temperaments);
	}
	catch(err) {
		next(err);
	}
}

module.exports = {
	getTemperaments
}