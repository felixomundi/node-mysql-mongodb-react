const express = require("express");
const cors =require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

//fetch products from db;
const db = require('./models')
const Product = db.products;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res) => {
    const products = await Product.findAll({
        attributes: [
            'name',
            'price'
        ]
    })
    res.status(200).send(products)
    console.log(products);
     });
    
app.use('/api/products', require('./routes/productRoute.js'));
app.use('/api/users', require('./routes/userRoute'));

app.listen(
   PORT,
    () => {
    console.log(`Server up and running on ${PORT}...`);
    }
);
