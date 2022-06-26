const express = require("express");
const router = express.Router();

const { getQR } = require("../controllers/qrController");

router.route("/").get(getQR);

module.exports = router;
