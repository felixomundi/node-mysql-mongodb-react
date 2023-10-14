const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password  || !role) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
   // pic,
    role,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      //pic:user.pic,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password ) {
    res.status(400)
    throw new Error('Please add all fields they are required')
  }

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role:user.role,
      //pic:user.pic,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      //pic: user.pic,
      
    });
  } 
});

//@desc get all users
//route GET api/users/all
//@access Private

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
   res.status(200).json(users)
  } catch (error) {
    res.json(error)
  }
})

//@Update user Profile
//@route post api/users/profile
//@access private

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name;
    //user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
   // user.pic = req.body.pic || user.pic;
 
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      //: updatedUser.email,
      role:updatedUser.role,
      //pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404)
    throw new Error('User Not found!')
  }
});

// @desc    Update user by admin
// @route   Patch /api/users/:id
// @access  Private
const updateUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
  
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
   // user.pic = req.body.pic || user.pic;
 
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email : updatedUser.email,
      role:updatedUser.role,
      //pic: updatedUser.pic,
         });
  } 
 })


// @desc    Delete user by admin
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }
  if (user && user.role === 'admin')
  {
    res.status(403)
   throw new Error('You cant delete admin user')
  } else {    
await user.remove()
res.status(200).json({ id: req.params.id })
    }
})



// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '20d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateProfile,
  getUsers,
  updateUserDetails,
  deleteUser,
 
}
