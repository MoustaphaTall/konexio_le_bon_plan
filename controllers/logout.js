const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	console.log('GET /logout');
	req.logout();
	console.log(req.isAuthenticated());
	res.redirect('/');
});

module.exports = router;
