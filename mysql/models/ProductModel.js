module.exports = (sequalize, DataTypes) => {
    const Product = sequalize.define('product', {     
        name:{
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate:{
                        notEmpty: true,
                        len: [3, 100]
                    }
                },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    })  
    return Product;
}