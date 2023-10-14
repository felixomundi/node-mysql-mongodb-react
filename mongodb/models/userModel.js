const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      // enum: ['admin', 'user'],
      default:'user',
    },
  //   pic: {
  //     type: String,
  //     required: true,
  //     default: "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png",
  // },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
