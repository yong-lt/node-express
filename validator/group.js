const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Modify = validatorer(
    joi.object({
        id: joi.number().required(),
        name: joi.string().min(5).max(10).required().messages({
            "string.max": "角色名称不能超过10个长度",
            "string.min": "角色名称长度至少有5个长度",
        }),
        menu: joi.string().min(1).required(),
        parent_id: joi.number().required(),
    })
);

const Add = validatorer(
    joi.object({
        menu: joi.string().min(1).required(),
        name: joi.string().min(5).max(10).required().messages({
            "string.max": "角色名称不能超过10个长度",
            "string.min": "角色名称长度至少有5个长度",
        }),
        parent_id: joi.number().required(),
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
