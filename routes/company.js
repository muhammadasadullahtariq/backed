const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");

router.get("/", CompanyController.all);
router.get("/:id", CompanyController.find);
router.post("/", CompanyController.create);
router.post("/:id", CompanyController.update);
router.delete("/:id", CompanyController.delete);

module.exports = router;
