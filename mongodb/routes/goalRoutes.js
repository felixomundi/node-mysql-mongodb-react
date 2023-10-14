const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  upload,
} = require('../controllers/goalController')

const { protect,  } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals)
router.route('/').post(protect,upload.single("image"),setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)
module.exports = router
