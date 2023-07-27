module.exports = () => (req, res, next) => {
    res.send({
        code: 500,
        msg: "接口未定义!!!",
    });
};
