/**
 * 文件上传模块，暂时只有上传头像。后续封装该模块
 */

const path = require("path");
const { formidable } = require("formidable");
const getIpAdress = require("../utils/ip");
const User = require("../model/user");

module.exports = (req, res, next) => {
    try {
        const site = req.headers["x-file-site"];
        const form = formidable({
            multiples: true, // 启用多个文件上传
            uploadDir: path.join(__dirname, `../public/${site}`),
            keepExtensions: true,
        });
        form.parse(req, (err, fields, files) => {
            const id = req._user.id;

            const avatar_url = `http://${getIpAdress()}:${process.env.PORT.trim()}/${site}/${files.file[0].newFilename}`;

            User.update({ avatar_url }, { where: { id } }).then(user => {
                if (user.length) {
                    res.send({
                        code: 200,
                        msg: "上传成功",
                    });
                }
            });
        });
    } catch (error) {
        next(error);
    }
};
