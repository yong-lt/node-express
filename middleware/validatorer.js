// 数据检验器
module.exports = schema => async (req, res, next) => {
    try {
        switch (req.method) {
            case "GET":
                await schema.validateAsync(req.query);
                break;
            case "POST":
                await schema.validateAsync(req.body);
                break;
        }
        next();
    } catch (error) {
        next(error);
    }
};
