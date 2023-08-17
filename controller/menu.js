// const db = require("../model/index");

const Group = require("../model/group");
const Menu = require("../model/menu");
const User = require("../model/user");
const { generaMenu } = require("../utils/genera");

exports.list = async (req, res, next) => {
    try {
        let resultMenus = [];
        // 是否直接获取所有为 0 的顶级菜单
        // if (req.query.parent_id) {
        //     resultMenus = await Menu.findAll({
        //         order: [["sort", "ASC"]],
        //         where: { is_delete: 1, parent_id: +req.query.parent_id },
        //     });
        // } else if (req.query.isSystem == 1) {
        //     const menus = await Menu.findAll({
        //         order: [["sort", "ASC"]],
        //         where: { is_delete: 1 },
        //     });
        //     generaMenu(resultMenus, menus, 0);
        // }

        const menus = await Menu.findAll({
            order: [["sort", "ASC"]],
            where: { is_delete: 1 },
        });
        generaMenu(resultMenus, menus, 0);

        res.send({
            code: 200,
            data: resultMenus,
            msg: "菜单获取成功",
        });
    } catch (error) {
        next(error);
    }
};

// 格式化，前端显示缩进
exports.formatListName = async (req, res, next) => {
    try {
        let resultGroup = [];
        const group = await Group.findAll({
            attributes: ["id", "name", "parent_id"],
            order: [["parent_id", "ASC"]],
            where: { is_delete: 1 },
        });

        resultGroup = group.map((item, index) => {
            if (index == 0) {
                return item;
            }

            const copy = { ...item.dataValues };

            let str = "   ";
            for (let i = 0; i < index; i++) {
                str += str;
            }

            copy["name"] = str + "∟" + item.name;

            return copy;
        });

        res.send({
            code: 200,
            data: resultGroup,
            msg: "获取成功",
        });
    } catch (error) {
        next(error);
    }
};

// 用户权限菜单
exports.authMenu = async (req, res, next) => {
    try {
        let resultMenus = [];

        const _id = req._user.id;
        const user = await User.findAll({
            attributes: ["auth"],
            where: {
                id: _id,
            },
        });

        const menu = await Group.findAll({
            attributes: ["menu"],
            where: {
                id: user[0].auth,
                is_delete: 1,
            },
        });

        const menuIds = menu[0].menu.split(",").map(item => +item);

        const menus = await Menu.findAll({
            order: [["sort", "ASC"]],
            where: { is_delete: 1, id: menuIds },
        });
        generaMenu(resultMenus, menus, 0);

        res.send({
            code: 200,
            data: resultMenus,
            msg: "菜单获取成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.modify = async (req, res, next) => {
    try {
        await Menu.update(req.body, { where: { id: +req.body.id } });
        res.send({
            code: 200,
            msg: "菜单修改成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        const menu = await Menu.create({ ...req.body, parent_id: req.body.parent_id ? req.body.parent_id : 0, is_delete: 1 });
        res.send({
            code: 200,
            data: menu,
            msg: "菜单添加成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.info = async (req, res, next) => {
    try {
        const menu = await Menu.findAll({ where: { id: +req.query.id } });
        if (menu.length > 0) {
            res.send({
                code: 200,
                data: menu[0],
                msg: "菜单信息获取成功",
            });
        } else {
            res.send({
                code: 200,
                data: {},
                msg: "菜单信息获取失败",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await Menu.update({ is_delete: 0 }, { where: { id: req.body.ids } });
        res.send({
            code: 200,
            msg: "菜单删除成功",
        });
    } catch (error) {
        next(error);
    }
};
