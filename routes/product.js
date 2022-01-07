const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const ProductImagesController = require("../controllers/ProductImagesController");
const ProductPurchasesController = require("../controllers/ProductPurchasesController");

const authorize = require("../middlewares/authorize");
const UserRoles = require("../helpers/userRoles");

router.get("/images/:name", ProductImagesController.find);

router.use(authorize([UserRoles.Admin, UserRoles.Customer]));

router.get("/", ProductController.all);
router.get("/:id", ProductController.find);
router.post("/", ProductController.create);
router.post("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

//images routes
router.post("/:productId/images", ProductImagesController.create);
router.delete("/:productId/images/:name", ProductImagesController.delete);

//purchases routes
router.get("/:productId/purchases", ProductPurchasesController.all);
router.post("/:productId/purchases", ProductPurchasesController.create);

module.exports = router;
