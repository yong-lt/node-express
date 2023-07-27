const express = require("express");

const router = express.Router();

const fileUploadCtrl = require("../controller/fileUpload");

router.post("/upload", fileUploadCtrl);

module.exports = router;
