const joi = require("joi");
const validatorer = require("../middleware/validatorer");

const Account = validatorer(
    joi.object({
        username: joi.string().min(5).max(10).required().messages({
            "string.empty": "用户名必填！",
            "string.max": "用户名不能超过10个长度",
            "string.min": "用户名长度至少有5个长度",
        }),
        password: joi.string().min(5).max(10).required().messages({
            "string.empty": "密码必填！",
            "string.max": "密码不能超过10个长度",
            "string.min": "密码长度至少有5个长度",
        }),
        auth: joi.string(),
        authname: joi.string(),
    })
);

module.exports = {
    Account,
};
