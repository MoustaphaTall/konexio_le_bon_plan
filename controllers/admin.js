const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const ProductModel = require('../models').Product;
const fs = require('fs');

const letterCapitalize = (word) => {
	return word.charAt(0).toUpperCase() + word.substring(1, word.length);
};

router.get('/', (req, res) => {
	res.render('admin');
});

// route pour appeler la page où il y a le formulaire
router.get('/products/add', (req, res) => {
	res.render('addProduct');
});

// route pour enregistrer le produit
router.post('/products/add', upload.array('photos', 12), (req, res) => {
	console.log('POST /products/add');
	console.log('/admin/products/add req.body', req.body);
	console.log('/admin/products/add req.files', req.files);
	console.log('/admin/products/add req.user', req.user);

	const userId = req.user._id;
	const { name, price, description, city } = req.body;

	const rawImages = req.files;
	const extensions = {
		'image/png': 'png',
		'image/jpeg': 'jpeg',
	};
	let imagesSrc = [];

	rawImages.forEach((image) => {
		const extension = extensions[image.mimetype];
		const newName = name.toLowerCase().replace(' ', '_');
		const filename = `${newName}_${image.filename}.${extension}`;
		const path = image.path;
		const newPath = `${image.destination}${filename}`;

		console.log('new path', newPath);
		console.log('images', filename);

		if (typeof extension === 'undefined') {
			res.send(
				`The file type of ${image.originalname} is not recognized.`
			);
			return;
		}

		//pushing right images path in empty array
		const src = newPath.replace('public', '');
		imagesSrc.push(src);

		//renaming images path
		fs.rename(path, newPath, (err) => {
			if (err !== null) {
				res.send('Error, try again');
				console.log('Error renaming the file', err);
				return;
			}
		});
	});

	// création de l'objet product
	const Product = new ProductModel({
		name: letterCapitalize(name),
		price,
		description,
		city: city.toLowerCase(),
		images: imagesSrc,
		user: userId,
	});

	// enregistrement du product dans la base de données.
	Product.save((err, product) => {
		if (err) {
			console.log('something went wrong');
			console.log(err);
		} else {
			console.log('product successfully saved:', product);

			const { name, price, description, city, images } = product;
			// Afficher le nouveau produit dans la page product.
			res.render('product', {
				name,
				price,
				description,
				city,
				images,
			});
		}
	});
});

module.exports = router;
