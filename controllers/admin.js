const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const ProductModel = require('../models').Product;

router.get('/', (req, res) => {
	res.render('admin');
});

const pictureLinks = (files) => {
	const urls = [];

	for (let i = 0; i < files.length; i++) {
		let url = `/uploads/${files[i].filename}.png`;
		urls.push(url);
	}

	return urls;
};

// route pour appeler la page où il y a le formulaire
router.get('/products/add', (req, res) => {
	res.render('addProduct');
});

// route pour enregistrer le produit
router.post('/products/add', upload.array('photos', 12), (req, res) => {
	// création de l'objet product
	const Product = new ProductModel({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		city: req.body.city,
		images: pictureLinks(req.files),
		//  user
	});
	// enregistrement du product dans la base de données.
	Product.save((err, product) => {
		if (err) {
			console.log('something went wrong');
			console.log(err);
		} else {
			// Afficher le nouveau produit dans la page product.
			res.render('product', {
				name: product.name,
				price: product.price,
				description: product.description,
				city: product.city,
				images: product.images,
			});
		}
	});
});

module.exports = router;
