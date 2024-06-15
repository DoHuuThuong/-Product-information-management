const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products/:maSanPham', productController.getProduct);
router.put('/products/:maSanPham', productController.updateProduct);
router.delete('/products/:maSanPham', productController.deleteProduct);
router.get('/products/search/:maSanPham', productController.searchProduct);

module.exports = router;
