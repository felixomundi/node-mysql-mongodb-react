const bcrypt = require('bcryptjs');
module.exports = (sequalize, DataTypes) => {
    const User = sequalize.define('user', {   
        _id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true

        },
        name:{
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate:{
                        notEmpty: true,
                        len: [3, 100]
                    }
        },
              email:{
            type: DataTypes.STRING,
                  allowNull: false,
                  unique:true,
            validate:{
                notEmpty: true,
                isEmail: true,
                            }
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue: "+254712345678",
                      
        },
        photo: {
            type: DataTypes.STRING,
            defaultValue: "https://changingourworld.com/wp-content/uploads/2018/01/avatar-placeholder.png",
        },
        bio: {
            type: DataTypes.STRING,
            defaultValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis.'
          
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                min:6,
            }
        },                
    },
    {
        initialAutoIncrement: 1,
      })  
    function generateHash(user) {
        if (user === null) {
            throw new Error('User');
        }
        else if (!user.changed('password')) return user.password;
        else {
            let salt = bcrypt.genSaltSync(10);
            return user.password = bcrypt.hashSync(user.password, salt);
        }
    }
    User.beforeCreate(generateHash);
    User.beforeUpdate(generateHash);
    return User;
}