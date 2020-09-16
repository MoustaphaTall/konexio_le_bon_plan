const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: String,
	price: String,
	description: String,
	city: String,
	images: Array,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
