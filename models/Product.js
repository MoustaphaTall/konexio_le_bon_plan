const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: String,
	price: String,
	description: String,
	city: String,
<<<<<<< HEAD
	images: Array,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
=======
	images: {
		type: Array,
		pic1: String,
		pic2: String,
		pic3: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	created: {
		type: Date,
		default: Date.now,
	},
>>>>>>> 14ceffdc8e4424644e2f3cb1ffc85feaa9a0bc74
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
