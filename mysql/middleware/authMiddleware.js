// const asyncHandler = require("express-async-handler");
const db = require('../models');
const User = db.users;
const jwt = require("jsonwebtoken");


const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
     return  res.status(401).json("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    // const user = await User.findOne(verified.id).select("-password");
    const user = await User.findOne({
      where:{_id:verified.id}
    });
    if (!user) {
    return  res.status(404).json("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
   return res.status(401).json("Not authorized, please login");
  } 
};

module.exports = protect; 
