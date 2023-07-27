const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Group = validatorer(
    joi.object({
        id: joi.number(),
        createdAt: joi.any(),
        updatedAt: joi.any(),
        name: joi.string().min(5).max(10).required().messages({
            "string.empty": "角色名称必填！",
            "string.max": "角色名称不能超过10个长度",
            "string.min": "角色名称长度至少有5个长度",
        }),
        menu: joi.string().min(1).max(20).required().messages({
            "string.empty": "角色权限必填！",
        }),
        parent_id: joi.number().required().messages({
            "string.empty": "上级角色必填！",
        }),
        is_delete: joi.number().min(1).max(1).unsafe(),
    })
);

module.exports = {
    Group,
};
