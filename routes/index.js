const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

/* API Router */
router.use("/v2/", apiRouter);

module.exports = router;
