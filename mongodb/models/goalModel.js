const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    price: {
      type: Number,
      required: [true, 'Please add product price'],
    },
    description: {
      type: String,
      required:true,
    },
    image: {
      type: String,
      required:true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)
