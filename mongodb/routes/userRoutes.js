const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUser,
  updateProfile,
  getUsers,
  updateUserDetails,
  deleteUser,
} = require('../controllers/userController');


const { protect, isAdmin } = require('../middleware/authMiddleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getUser);
router.get('/', protect,isAdmin, getUsers);
router.post('/profile', protect, updateProfile);
router.patch('/:id', protect, isAdmin, updateUserDetails)
router.delete('/:id', protect,isAdmin,deleteUser)
module.exports = router;
