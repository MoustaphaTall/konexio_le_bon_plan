const express = require('express');
const router = express.Router();

// route pour récuperer un produit par son id
router.get('/:id', (req, res) => {
	const id = req.params.id;

	ProductModel.find({ _id: id }, (err, product) => {
		if (!err) {
			console.log(product);
			console.log(product.name);
			res.render('product', {
				name: product[0].name,
				price: product[0].price,
				description: product[0].description,
				city: product[0].city,
				images: product[0].images
			});
		}
		res.re;
	});
});

module.exports = router;
