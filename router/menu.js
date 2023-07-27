const express = require("express");
const router = express.Router();

const menuCtrl = require("../controller/menu");
const menuValidator = require("../validator/menu");

router.get("/list", menuCtrl.list);
router.post("/modify", menuValidator.Menu, menuCtrl.modify);
router.post("/delete", menuCtrl.delete);
router.get("/info", menuCtrl.info);

module.exports = router;
