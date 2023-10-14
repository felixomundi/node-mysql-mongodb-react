const db = require('../models')
// create main model

const Product = db.products;

const addProduct = async (req, res) => {
    let info = {
        name: req.body.name,
        price:req.body.price,

    }
    const product = await Product.create(info)
    res.status(200).json(product)
}


const getProducts = async(req,res) => {
    const products = await Product.findAll({
        attributes: [
            'name',
            'price'
        ]
    })
    res.status(200).send(products)
}



const getProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findOne({
        where:{id:id}
    })
    res.status(200).send(product)
}

const updateProduct = async(req, res) => {
    let id = req.params.id; 
    const product = await Product.update(req.body, { where: { id: id } })
    res.status(200).json({
        message:`${product} updated successfuly`
    })
}

module.exports = {
    addProduct, getProduct, getProducts,
    updateProduct
}