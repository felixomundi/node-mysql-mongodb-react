const  { Sequelize,DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig.js");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAlliases: false, // error showing
   
    //     pool: {
    //         max: dbConfig.pool.max,
    //         min: dbConfig.pool.min,
    //         acquire: dbConfig.pool.acquire,
    //         idle:dbConfig.pool.idle,
    // }
   }
)

sequelize.authenticate()
    .then(() => {
    console.log('connected successful')
    }).catch(err => {
    console.log("Error" + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.products = require("./ProductModel.js")(sequelize, DataTypes);
db.users = require("./UserModel.js")(sequelize, DataTypes);
db.tokens = require("./tokenModel.js")(sequelize, DataTypes);
//relationship
db.users.hasOne(db.tokens);
db.tokens.belongsTo(db.users, {foreignKey: 'userId'});


db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done')
})
module.exports = db;