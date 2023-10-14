const asyncHandler = require('express-async-handler')
const multer = require('multer')
const Goal = require('../models/goalModel')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })

  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
// const setGoal = asyncHandler(async (req, res) => {
//   const { name, price, description, image } = req.body
  
//   if (!name || !price || !description || !image) {
//     res.status(400)
//     throw new Error('Please add all fields field')
//   }

//   const goal = await Goal.create({
//     name,
//     price,
//     description,
//     image:req.file.originalname,
//     user: req.user.id,
//   })

//   res.status(200).json({goal,
//     message: "File uploaded successfully"})
// })


const setGoal = asyncHandler(async (req, res) => {
  const newGoal = new Goal({
    image: req.file.originalname,
    price: req.body.price,
    description: req.body.description,
    name: req.body.name,
    user: req.user.id,
  })
  newGoal.save().then(() => res.status(201).json('New blog added')).catch((err) => res.status(400).json(`Error: ${err}`)
  )
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  upload,
}
