const express = require("express");
const router = express.Router();

const groupCtrl = require("../controller/group");
const groupValidator = require("../validator/group");

router.get("/list", groupCtrl.list);
router.get("/info", groupCtrl.info);
router.post("/modify", groupValidator.Group, groupCtrl.modify);
router.post("/delete", groupCtrl.delete);

module.exports = router;
