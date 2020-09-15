const express = require('express');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
	console.log('GET /logout');
	req.logout();
	res.redirect('/');
});

module.exports = router;
