module.exports = (sequalize, DataTypes) => {
    const Token = sequalize.define('token', {     
        _id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true

        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        
    },
    {
        initialAutoIncrement: 1,
        })  
        return Token;
}