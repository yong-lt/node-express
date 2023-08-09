// const db = require("../model/index");
const md5 = require("../utils/md5");
const User = require("../model/user");
const { sign } = require("jsonwebtoken");
const { jwtStr } = require("../config/config.default");
const Group = require("../model/group");

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
            const token = await sign({ id, username }, jwtStr, { expiresIn: 60 * 60 * 48 });

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
// 用户添加
exports.add = async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { username: req.body.username } });

        if (users.length) {
            res.send({
                code: 500,
                data: {},
                msg: "用户名已存在！",
            });
        } else {
            const group = await Group.findAll({
                attributes: ["id", "name"],
                where: { is_delete: 1 },
            });

            const _user = { ...req.body };

            _user["auth_name"] = group.find(item => item.id == req.body.auth).dataValues.name;
            _user["password"] = req.body.password ? req.body.password : "a123456";
            const user = await User.create(_user);

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

// 信息修改
exports.modify = async (req, res, next) => {
    try {
        const { nickname, password } = req.body;
        const user = await User.update({ nickname, password }, { where: { id: +req.body.id } });
        if (user.length > 0) {
            res.send({
                code: 200,
                msg: "信息修改成功",
            });
        } else {
            res.send({
                code: 200,
                data: {},
                msg: "信息修改失败",
            });
        }
    } catch (error) {
        next(error);
    }
};

// 用户信息
exports.info = async (req, res, next) => {
    try {
        const user = await User.findAll({
            where: { id: +req._user.id },
        });
        const userinfo = user[0].dataValues;
        delete userinfo.password;
        if (user.length > 0) {
            res.send({
                code: 200,
                data: userinfo,
                msg: "用户信息获取成功",
            });
        } else {
            res.send({
                code: 200,
                data: {},
                msg: "未查到该用户",
            });
        }
    } catch (error) {
        next(error);
    }
};

// 用户列表
exports.list = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: ["id", "username", "nickname", "create_time", "update_time", "auth", "auth_name"] });
        res.send({
            code: 200,
            data: users,
            msg: "",
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await User.destroy({ where: { id: req.body.ids } });
        res.send({
            code: 200,
            msg: "用户删除成功",
        });
    } catch (error) {
        next(error);
    }
};
