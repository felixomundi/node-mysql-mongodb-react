const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')


// @desc    Get products
// @route   GET /api/products
// @access  Private
const homeProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({  })
  res.status(200).json(products)
})



// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({  })
  res.status(200).json(products)
})

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body
  
  if (!name || !price || !description|| !image) {
    res.status(400)
    throw new Error('Please add all fields field')
  }

  const product = await Product.create({
    name,
    price,
    description,
    image,
   
  })

  res.status(200).json(product)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const { name,price, description } = req.body;
  const { id } = req.params;
  //const trimmed_id = id.trim() 
  //const product = await Product.findById(trimmed_id)
  const product = await Product.findById(id)
  if (!product) {
    res.status(400)
    throw new Error('Product not found')
  }
  //const updatedProduct = await Product.findByIdAndUpdate({ _id: trimmed_id },
    const updatedProduct = await Product.findByIdAndUpdate({ _id: id },
      { name, price, description },
      {new: true}
  )
  res.status(200).json(updatedProduct)
  })

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('product not found')
  }


  await product.remove()

  res.status(200).json({ id: req.params.id })
})

const getProduct =asyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('product not found')
  }

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  homeProducts,

}
