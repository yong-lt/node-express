const express = require("express");

const router = express.Router();

router.use("/users", require("./user"));
router.use("/menu", require("./menu"));
router.use("/group", require("./group"));

module.exports = router;
