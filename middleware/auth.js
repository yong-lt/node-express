const { jwtStr, notAuth } = require("../config/config.default");
const { verify } = require("../utils/jwt");

module.exports = () => async (req, res, next) => {
    const url = req.originalUrl;
    // 不需要验证的接口直接放行
    if (notAuth.includes(url)) {
        next();
    } else {
        // 从请求头获取token数据
        let token = req.headers["token"];
        // 验证token是否存在
        token = token ? token : null;
        // 如果不存在， 发送响应 401 结束响应
        if (!token) {
            return res.send({
                code: 500,
                msg: "无权访问接口！",
            });
        }
        try {
            // 验证token是否有效
            const decodedToken = await verify(token, jwtStr);
            // 挂着用户信息到 req
            req._user = decodedToken;
            next();
        } catch (err) {
            console.log(err.message);
            next(err);
        }
    }
};
