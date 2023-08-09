const express = require("express");
const router = express.Router();

const groupCtrl = require("../controller/group");
const groupValidator = require("../validator/group");

router.get("/list", groupCtrl.list);
router.get("/format.list.name", groupCtrl.formatListName);
router.get("/info", groupValidator.Info, groupCtrl.info);
router.post("/modify", groupValidator.Modify, groupCtrl.modify);
router.post("/add", groupValidator.Add, groupCtrl.add);
router.post("/delete", groupValidator.Delete, groupCtrl.delete);

module.exports = router;
