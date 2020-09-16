const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true,
	},
	password: String,
	firstName: String,
	surname: String,
	userPic: String,
	created: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', UserSchema);

module.exports = User;
