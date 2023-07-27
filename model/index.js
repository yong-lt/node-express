const { dbConfig } = require("../config/config.default");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: "mysql",
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("数据库连接成功");
    } catch (error) {
        console.error("数据库连接失败:", error);
    }
}
module.exports = {
    sequelize,
    connectDB,
};
