const express = require('express');
const router = express.Router();
const ProductModel = require('../models').Product;
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const pictureLinks = (files) => {
	const urls = [];

	for (let i = 0; i < files.length; i++) {
		let url = `/uploads/${files[i].filename}.png`;
		urls.push(url);
	}

	return urls;
};

// route pour appeler la page où il y a le formulaire
router.get('/', (req, res) => {
	res.render('form');
});

// route pour enregistrer le produit
router.post('/', upload.array('photos', 12), (req, res) => {
	// création de l'objet product
	const Product = new ProductModel({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		city: req.body.city,
		images: pictureLinks(req.files)
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
				images: product.images
			});
		}
	});
});

// route pour récuperer un produit par son id
router.get('/:id', (req, res) => {
	// à faire
});

// route pour récuperer tout les produits qui sont dans la même ville
router.get('/cities/:city', (req, res) => {
	// à faire
});

module.exports = router;
