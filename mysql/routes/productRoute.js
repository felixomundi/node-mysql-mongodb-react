const express  = require("express");
const  { addProduct, getProduct, getProducts, updateProduct } = require("../controllers/productController");
const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
module.exports = router;
//export default router