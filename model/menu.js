const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");

const Menu = sequelize.define(
    "menu",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        component: {
            type: DataTypes.STRING,
        },
        sort: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_delete: {
            type: DataTypes.NUMBER,
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

module.exports = Menu;
