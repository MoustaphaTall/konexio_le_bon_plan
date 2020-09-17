const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	console.log('GET /profile');
	// console.log('/profile req.user', req.user);

	if (req.isAuthenticated() === true) {
		const { username, surname, firstname, userPic } = req.user;
		res.render('profile', {
			username,
			surname,
			firstname,
			userPic,
		});
	} else {
		res.redirect('/signup');
	}
});

module.exports = router;
