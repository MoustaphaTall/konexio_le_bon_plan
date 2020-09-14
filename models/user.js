const mongoose = require('mongoose');

const testUserSchema = new mongoose.Schema({
	username: String,
});

const TestUser = mongoose.model('User', testUserSchema);
TestUser.create({ username: 'Moi' }, (err, testUserDb) => {
	if (err !== null) {
		console.log('error', err);
		res.send('An error occurred: test user not added');
		return;
	}

	console.log('testUserDb', testUserDb);
});
