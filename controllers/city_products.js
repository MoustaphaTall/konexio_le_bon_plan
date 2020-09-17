const express = require('express');
const { Product } = require('../models');
const router = express.Router();


// route pour récuperer tout les produits qui sont dans la même ville
router.get('/:city', (req, res) => {
	const city = req.params.city;
	Product.find({city}, (err, productsDb) => {
		const products = productsDb.map((product) => product.toObject());
		console.log(products);
		res.render('city', {products: products});
	});
});

module.exports = router;


