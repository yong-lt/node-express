module.exports = () => (err, req, res, next) => {
    switch (err.message) {
        case "jwt expired":
            res.send({
                code: 401,
                msg: "token 过期, 请重新登录",
            });
            break;
        case "invalid signature":
            res.send({
                code: 401,
                msg: "token 无效签名",
            });
            break;

        default:
            res.send({
                code: 500,
                msg: err.message,
            });
            break;
    }
};
