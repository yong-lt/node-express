// const db = require("../model/index");

const Menu = require("../model/menu");
const { generaMenu } = require("../utils/genera");

exports.list = async (req, res, next) => {
    try {
        const menus = await Menu.findAll({
            order: [["sort", "ASC"]],
            where: { is_delete: 1 },
        });
        const resultMenus = [];
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
        if (req.body.id) {
            await Menu.update(req.body, { where: { id: req.body.id } });
            res.send({
                code: 200,
                msg: "菜单修改成功",
            });
        } else {
            const menu = await Menu.create({ ...req.body, is_delete: 1 });
            res.send({
                code: 200,
                data: menu,
                msg: "菜单添加成功",
            });
        }
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
        console.log(req.body.ids);
        await Menu.update({ is_delete: 0 }, { where: { id: req.body.ids } });
        res.send({
            code: 200,
            msg: "菜单删除成功",
        });
    } catch (error) {
        next(error);
    }
};
