// node 内置 加密和哈希算法
const crypto = require("crypto");
const config = require("../config/config.default");

// console.log(crypto.getHashes());

module.exports = str => {
    // 混入一个随机字符串，避免被暴力破解
    return crypto.createHash("md5").update(`${config.md5Str}${str}`).digest("hex");
};
