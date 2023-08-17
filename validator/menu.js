const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Modify = validatorer(
    joi.object({
        id: joi.number(),
        title: joi.string().min(1).max(10).required().messages({
            "string.max": "菜单名称不能超过10个长度",
            "string.min": "菜单名称长度至少有1个长度",
        }),
        icon: joi.string().required().messages({
            "string.empty": "菜单ICON必填！",
        }),
        sort: joi.number().required(),
        component: joi.string().min(1).max(20).messages({
            "string.max": "菜单组件不能超过20个长度",
            "string.min": "菜单组件长度至少有1个长度",
        }),
        parent_id: joi.number().max(3).required().messages({
            "string.max": "上级菜单不能超过3个长度",
            "string.min": "上级菜单长度至少有1个长度",
        }),
        type: joi.string().min(1).max(20).required().messages({
            "string.max": "菜单类型不能超过20个长度",
            "string.min": "菜单类型长度至少有1个长度",
        }),
    })
);

const Add = validatorer(
    joi.object({
        title: joi.string().min(1).max(10).required().messages({
            "string.max": "菜单名称不能超过10个长度",
            "string.min": "菜单名称长度至少有1个长度",
        }),
        icon: joi.string().required(),
        sort: joi.number().required(),
        component: joi.string().min(1).max(20).messages({
            "string.max": "菜单组件不能超过20个长度",
            "string.min": "菜单组件长度至少有1个长度",
        }),
        parent_id: joi.number().max(3).messages({
            "string.max": "上级菜单不能超过3个长度",
            "string.min": "上级菜单长度至少有1个长度",
        }),
        type: joi.string().min(1).max(20).required().messages({
            "string.max": "菜单类型不能超过20个长度",
            "string.min": "菜单类型长度至少有1个长度",
        }),
    })
);

const Delete = validatorer(
    joi.object({
        ids: joi.array().items(joi.number().required()),
    })
);

const Info = validatorer(joi.object({ id: joi.number().required() }));

module.exports = {
    Modify,
    Delete,
    Info,
    Add,
};
