const express = require('express');
const { Product } = require('../models');
const router = express.Router();

const letterCapitalize = (word) => {
	return word.charAt(0).toUpperCase() + word.substring(1, word.length);
};

// route pour récuperer tout les produits qui sont dans la même ville
router.get('/:city', (req, res) => {
	const city = req.params.city;
	const uppedCity = letterCapitalize(city);

	Product.find({ city }, (err, productsDb) => {
		const products = productsDb.map((product) => product.toObject());
		console.log('produits', products);

		res.render('city', { products, city: uppedCity });
	});
});

module.exports = router;
