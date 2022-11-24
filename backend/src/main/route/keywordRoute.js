const express = require("express");
const router = express.Router();

const keywordController = require("../controller/keywordController");

// About page route.
router.post("/", keywordController.getKeyword);

module.exports = router;