const Group = require("../model/group");
const { generaGroup } = require("../utils/genera");

exports.list = async (req, res, next) => {
    try {
        const group = await Group.findAll({
            attributes: ["id", "name", "createdAt", "updatedAt", "parent_id"],
            where: { is_delete: 1 },
        });
        if (req.query.h === "true") {
            res.send({
                code: 200,
                data: group,
                msg: "角色获取成功",
            });
        }
        const resultGroup = [];
        generaGroup(resultGroup, group, 0);
        res.send({
            code: 200,
            data: resultGroup,
            msg: "角色获取成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.modify = async (req, res, next) => {
    try {
        if (req.body.id) {
            await Group.update(req.body, { where: { id: req.body.id } });
            res.send({
                code: 200,
                msg: "角色修改成功",
            });
        } else {
            const group = await Group.create({ ...req.body, is_delete: 1 });
            res.send({
                code: 200,
                data: group,
                msg: "角色添加成功",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.info = async (req, res, next) => {
    try {
        const group = await Group.findAll({ where: { id: +req.query.id } });
        console.log(group);
        if (group.length > 0) {
            res.send({
                code: 200,
                data: { ...group[0].dataValues, menu: group[0].dataValues.menu.split(",").map(item => +item) },
                // data: group[0],
                msg: "角色信息获取成功",
            });
        } else {
            res.send({
                code: 200,
                data: {},
                msg: "角色信息获取失败",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        await Group.update({ is_delete: 0 }, { where: { id: req.body.ids } });
        res.send({
            code: 200,
            msg: "角色删除成功",
        });
    } catch (error) {
        next(error);
    }
};
