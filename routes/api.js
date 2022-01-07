const express = require("express");
const router = express.Router();

const categoryRouter = require("./category");
const companyRouter = require("./company");

router.use("/categories/", categoryRouter);
router.use("/companies/", companyRouter);

module.exports = router;
