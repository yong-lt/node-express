// const db = require("../model/index");
const md5 = require("../utils/md5");
const User = require("../model/user");
const { sign } = require("jsonwebtoken");
const { jwtStr } = require("../config/config.default");

// 用户登录
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // 验证用户名和密码
        const user = await User.findAll({
            where: {
                username,
                password: md5(password),
            },
        });
        if (user.length) {
            const { id, username, create_time, update_time, avatar_url, last_login_time, nickname } = user[0].dataValues;
            // 生成token
            const token = await sign({ id, username }, jwtStr, { expiresIn: 60 * 60 * 2 });

            // 更新最后登录时间
            const _last_login_time = new Date().toLocaleString().replace(/\//g, "-");

            await User.update({ last_login_time: _last_login_time }, { where: { id } });

            res.send({
                code: 200,
                data: { id, username, token, create_time, update_time, avatar_url, last_login_time, nickname },
                msg: "登录成功",
            });
        } else {
            res.send({
                code: 500,
                data: {},
                msg: "用户名或密码错误",
            });
        }
    } catch (error) {
        next(error);
    }
};
// 用户注册
exports.modify = async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { username: req.body.username } });

        if (users.length) {
            res.send({
                code: 500,
                data: {},
                msg: "用户名已存在！",
            });
        } else {
            const user = await User.create(req.body);

            if (user.id) {
                res.send({
                    code: 200,
                    data: {},
                    msg: "注册成功",
                });
            } else {
                res.send({
                    code: 200,
                    data: {},
                    msg: "注册失败",
                });
            }
        }
    } catch (error) {
        next(error);
    }
};
// 用户信息
exports.info = async (req, res, next) => {
    try {
        // console.log(req._user);
        const user = await User.findAll({
            attributes: ["id", "username", "createdAt", "updatedAt", "auth", "authname"],
            where: { id: +req.query.id },
        });
        if (user.length > 0) {
            res.send({
                code: 200,
                data: user[0],
                msg: "用户信息获取成功",
            });
        } else {
            res.send({
                code: 200,
                data: {},
                msg: "用户信息获取失败",
            });
        }
    } catch (error) {
        next(error);
    }
};

// 用户列表
exports.list = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: ["id", "username", "createdAt", "updatedAt", "auth", "authname"] });
        res.send({
            code: 200,
            data: users,
            msg: "",
        });
    } catch (error) {
        next(error);
    }
};
