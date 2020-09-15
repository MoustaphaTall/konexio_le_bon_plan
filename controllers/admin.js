const express = require('express');
const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });

router.get('/admin', (req, res) => {
	res.render(admin);
});

router.get('admin/product/add', (req, res) => {
	res.render(addProduct);
});

router.post('admin/product/add', upload.array(images, 3), (req, res) => {});

module.exports = router;
