const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");

const Group = sequelize.define("Group", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    is_delete: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
});

module.exports = Group;
