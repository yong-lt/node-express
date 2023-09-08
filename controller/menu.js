const Group = require("../model/group");
const Menu = require("../model/menu");
const User = require("../model/user");
const { generaMenu } = require("../utils/genera");

exports.list = async (req, res, next) => {
    try {
        let resultMenus = [];
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
        await Menu.create({ ...req.body, parent_id: req.body.parent_id ? req.body.parent_id : 0, is_delete: 1 });
        await updateSuperAuth();
        res.send({
            code: 200,
            data: {},
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

        await updateSuperAuth();

        res.send({
            code: 200,
            msg: "菜单删除成功",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 更新超级管理员权限
 */
async function updateSuperAuth() {
    const ids = await Menu.findAll({
        attributes: ["id"],
        where: {
            is_delete: 1,
        },
    });

    // 更新超级管理员权限
    await Group.update(
        { menu: ids.map(i => i.id).join() },
        {
            where: { id: 1 },
        }
    );
}
