const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: String,
	price: String,
	description: String,
	city: String,
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
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
