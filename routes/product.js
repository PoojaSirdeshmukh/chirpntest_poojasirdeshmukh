var express = require('express');
var router = express.Router();
var productController = require('../controller/productController.js');

router.post('/addProducts', productController.addProducts);
router.post('/getProductList', productController.getProductList);
router.post('/updateProduct', productController.updateProduct);
router.post('/deleteProduct', productController.getProductList);






module.exports = router;
