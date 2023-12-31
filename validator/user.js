const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Login = validatorer(
    joi.object({
        username: joi.string().min(5).max(10).required().messages({
            "string.max": "用户名不能超过10个长度",
            "string.min": "用户名长度至少有5个长度",
        }),
        password: joi.string().min(5).max(10).required().messages({
            "string.max": "密码不能超过10个长度",
            "string.min": "密码长度至少有5个长度",
        }),
    })
);

const Modify = validatorer(
    joi.object({
        id: joi.number().required(),
        username: joi.string().min(5).max(10).messages({
            "string.max": "用户名不能超过10个长度",
            "string.min": "用户名长度至少有5个长度",
        }),
        password: joi.string().min(5).max(10).messages({
            "string.max": "密码不能超过10个长度",
            "string.min": "密码长度至少有5个长度",
        }),
        nickname: joi.string().min(5).max(10).messages({
            "string.max": "昵称不能超过10个长度",
            "string.min": "昵称长度至少有5个长度",
        }),
        auth: joi.number(),
    })
);

const Add = validatorer(
    joi.object({
        username: joi.string().min(5).max(10).required().messages({
            "string.max": "用户名不能超过10个长度",
            "string.min": "用户名长度至少有5个长度",
        }),
        nickname: joi.string().min(5).max(10).required().messages({
            "string.max": "昵称不能超过10个长度",
            "string.min": "昵称长度至少有5个长度",
        }),
        password: joi.string().min(5).max(10).messages({
            "string.max": "密码不能超过10个长度",
            "string.min": "密码长度至少有5个长度",
        }),
        auth: joi.number().required(),
    })
);

const Delete = validatorer(
    joi.object({
        ids: joi.array().items(joi.number().required()),
    })
);

module.exports = {
    Modify,
    Login,
    Add,
    Delete,
};
