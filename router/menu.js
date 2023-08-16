const express = require("express");
const router = express.Router();

const menuCtrl = require("../controller/menu");
const menuValidator = require("../validator/menu");

router.get("/list", menuCtrl.list);
router.post("/modify", menuValidator.Modify, menuCtrl.modify);
router.post("/add", menuValidator.Add, menuCtrl.add);
router.post("/delete", menuValidator.Delete, menuCtrl.delete);
router.get("/info", menuValidator.Info, menuCtrl.info);

module.exports = router;
