const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	console.log('GET /logout');
	req.logout();
	console.log('/logout authenticated?', req.isAuthenticated());
	res.redirect('/');
});

module.exports = router;
