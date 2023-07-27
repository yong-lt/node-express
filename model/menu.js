const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");

const Menu = sequelize.define("Menu", {
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
    path: {
        type: DataTypes.STRING,
        allowNull: false,
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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_delete: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
});

module.exports = Menu;
