const util = require("util");

module.exports = () => (req, res, next) => {
    if (req.method === "GET") {
        console.log("GET QUERY:" + util.format(req.query));
    } else {
        console.log("POST BODY:" + util.format(req.body));
    }
    next();
};
