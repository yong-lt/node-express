const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");

router.post("/login", userValidator.Login, userCtrl.login);
router.post("/modify", userValidator.Modify, userCtrl.modify);
router.post("/add", userValidator.Add, userCtrl.add);
router.post("/delete", userValidator.Delete, userCtrl.delete);
router.get("/info", userCtrl.info);
router.get("/list", userCtrl.list);

module.exports = router;
