const express = require('express')
const router = express.Router()
const {
getProducts,
setProduct,
updateProduct,
deleteProduct,
getProduct,
homeProducts,
} = require('../controllers/productController')

const { protect, isAdmin } = require('../middleware/authMiddleware')

router.route('/home').get(homeProducts)
router.route('/').get(protect, isAdmin, getProducts).post(protect,isAdmin, setProduct)
router.route('/:id').delete(protect,isAdmin, deleteProduct).put( updateProduct)
router.route('/:id').get(protect, isAdmin, getProduct)

module.exports = router;
