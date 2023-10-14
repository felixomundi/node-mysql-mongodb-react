const express = require('express');
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, resetPassword, forgotPassword } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

// router.post("/", forgotPassword);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/logout", logout);
router.get("/loggedin", loginStatus);
router.get("/:id", protect, getUser);
router.patch("/:id", protect, updateUser);
router.put('/:p', protect, changePassword);
// router.post("/", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
module.exports = router;