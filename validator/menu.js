const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Menu = validatorer(
    joi.object({
        id: joi.number(),
        createdAt: joi.any(),
        updatedAt: joi.any(),
        title: joi.string().min(1).max(10).required().messages({
            "string.empty": "菜单名称必填！",
            "string.max": "菜单名称不能超过10个长度",
            "string.min": "菜单名称长度至少有1个长度",
        }),
        icon: joi.string().required().messages({
            "string.empty": "菜单ICON必填！",
        }),
        sort: joi.number().min(1).max(3).required().messages({
            "string.empty": "菜单顺序必填！",
            "string.max": "菜单顺序不能超过3个长度",
            "string.min": "菜单顺序长度至少有1个长度",
        }),
        component: joi.string().min(1).max(20).messages({
            "string.max": "菜单组件不能超过20个长度",
            "string.min": "菜单组件长度至少有1个长度",
        }),
        path: joi.string().min(1).max(20).required().messages({
            "string.empty": "菜单路径必填！",
            "string.max": "菜单路径不能超过20个长度",
            "string.min": "菜单路径长度至少有1个长度",
        }),
        parent_id: joi.number().min(1).max(3).required().messages({
            "string.empty": "上级菜单必填！",
            "string.max": "上级菜单不能超过3个长度",
            "string.min": "上级菜单长度至少有1个长度",
        }),
        type: joi.string().min(1).max(20).required().messages({
            "string.empty": "菜单类型必填！",
            "string.max": "菜单类型不能超过20个长度",
            "string.min": "菜单类型长度至少有1个长度",
        }),
        name: joi.string().min(1).max(20).required().messages({
            "string.empty": "路由名称必填！",
            "string.max": "路由名称不能超过20个长度",
            "string.min": "路由名称长度至少有1个长度",
        }),
        is_delete: joi.number().min(1).max(1).required().messages({
            "string.empty": "菜单状态必填！",
            "string.max": "菜单状态不能超过1个长度",
            "string.min": "菜单状态长度至少有1个长度",
        }),
    })
);

module.exports = {
    Menu,
};
