const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");

router.post("/login", userValidator.Account, userCtrl.login);
router.post("/modify", userValidator.Account, userCtrl.modify);
router.get("/info", userCtrl.info);
router.get("/list", userCtrl.list);

module.exports = router;
