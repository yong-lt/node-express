const Group = require("../model/group");
const { generaGroup } = require("../utils/genera");

exports.list = async (req, res, next) => {
    try {
        let resultGroup = [];
        let group = [];
        switch (req.query.isTree) {
            // 格式化名称，显示缩进关系
            case "1":
                group = await Group.findAll({
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
                break;

            default:
                group = await Group.findAll({
                    attributes: ["id", "name", "parent_id"],
                    where: { is_delete: 1 },
                });

                generaGroup(resultGroup, group, 0);
                break;
        }

        res.send({
            code: 200,
            data: resultGroup,
            msg: "获取成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.modify = async (req, res, next) => {
    try {
        const { id, parent_id } = req.body;
        if (id == parent_id) {
            res.send({
                code: 500,
                msg: "上级不能是自身",
            });
        }

        await Group.update(req.body, { where: { id: +req.body.id } });
        res.send({
            code: 200,
            msg: "角色修改成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        await Group.create({ ...req.body, parent_id: req.body.parent_id ? req.body.parent_id : 0, is_delete: 1 });
        res.send({
            code: 200,
            data: {},
            msg: "角色添加成功",
        });
    } catch (error) {
        next(error);
    }
};

exports.info = async (req, res, next) => {
    try {
        const group = await Group.findAll({ where: { id: +req.query.id } });
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
