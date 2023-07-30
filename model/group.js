const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");

const Group = sequelize.define(
    "group",
    {
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
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: "create_time",
        updatedAt: "update_time",
    }
);

module.exports = Group;
