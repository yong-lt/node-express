const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");
const md5 = require("../utils/md5");

const User = sequelize.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("password", md5(value));
            },
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar_url: {
            type: DataTypes.STRING,
        },
        last_login_time: {
            type: DataTypes.STRING,
        },
        auth: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        auth_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    }
);

module.exports = User;
