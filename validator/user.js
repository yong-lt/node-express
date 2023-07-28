const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Account = validatorer(
    joi.object({
        username: joi.string().min(5).max(10).messages({
            "string.max": "用户名不能超过10个长度",
            "string.min": "用户名长度至少有5个长度",
        }),
        password: joi.string().min(5).max(10).messages({
            "string.max": "密码不能超过10个长度",
            "string.min": "密码长度至少有5个长度",
        }),
        nickname: joi.string().min(5).max(10).messages({
            "string.max": "密码不能超过10个长度",
            "string.min": "密码长度至少有5个长度",
        }),
    })
);

module.exports = {
    Account,
};
