const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { v4: uuid4 } = require("uuid");
const { body } = require("express-validator");
const fs = require("fs");

const Product = require("../models/ProductModel");
const apiResponse = require("../helpers/apiResponse");

var storage = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "uploads"),
  filename: function (req, file, callback) {
    callback(null, uuid4() + ".jpeg");
  },
});

var upload = multer({ storage: storage });

// const imageTypes = [
  // { name: "thumbnail", width: 160, height: 90, quality: 100 },
  // { name: "medium", width: 480, height: 270, quality: 100 },
  // { name: "large", width: 640, height: 360, quality: 100 },
// ];

const imageTypes = [
  { name: "thumbnail", width: 160, height: 120, quality: 100 },
  { name: "medium", width: 480, height: 360, quality: 100 },
  { name: "large", width: 640, height: 480, quality: 100 },
];

let ProductImagesController = {
  find: async (req, res) => {
    try {
      let imgPath = path.resolve(
        __dirname,
        "..",
        "uploads",
        req.query.type ? req.query.type : "",
        req.params.name
      );

      let stream = fs.createReadStream(imgPath);
      stream.on("open", function () {
        res.set("Content-Type", "image/jpeg");
        stream.pipe(res);
      });

      stream.on("error", function () {
        return apiResponse.notFoundResponse(res, "Image not found");
      });
    } catch (err) {
      apiResponse.errorResponse(res, "Unable to load image");
    }
  },
  create: [
    async (req, res, next) => {
      try {
        let productId = req.params.productId;

        //Checking if id is valid
        if (!mongoose.Types.ObjectId.isValid(productId))
          return apiResponse.validationError(res, "Invalid Id");

        //Checking if product exists
        if (!(await Product.exists({ _id: productId })))
          return apiResponse.notFoundResponse(res, "Product not found");

        next();
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to create product image");
      }
    },
    upload.single("image"),
    async (req, res) => {
      try {
        let { filename: image } = req.file;

        //Saving in imgTypes
        for (let imgType of imageTypes) {
          await sharp(req.file.path)
            .resize(imgType.width, imgType.height)
            .jpeg({ quality: imgType.quality })
            .toFile(path.resolve(req.file.destination, imgType.name, image));
        }

        //Adding images to product
        let product = await Product.findByIdAndUpdate(
          req.params.productId,
          {
            $push: { images: image },
          },
          { new: true }
        );

        return apiResponse.successResponseWithData(
          res,
          "Product Image Created",
          product.images
        );
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to create product image");
      }
    },
  ],
  delete: async (req, res) => {
    try {
      let { productId, name } = req.params;

      //Checking if productId is valid
      if (!mongoose.Types.ObjectId.isValid(productId))
        return apiResponse.validationError(res, "Invalid Id");

      //Adding images to product
      var product = await Product.findById(req.params.productId);
      if (product === null)
        return apiResponse.notFoundResponse(res, "Product not found");

      let uploadsPath = path.resolve(__dirname, "..", "uploads");
      if (fs.existsSync(path.join(uploadsPath, name))) {
        product = await Product.findByIdAndUpdate(
          req.params.productId,
          {
            $pull: { images: name },
          },
          { new: true }
        );

        fs.unlinkSync(path.join(uploadsPath, name));

        for (let imgType of imageTypes)
          fs.unlinkSync(path.join(uploadsPath, imgType.name, name));
      }

      return apiResponse.successResponseWithData(
        res,
        "Image Deleted",
        product.images
      );
    } catch (err) {
      apiResponse.errorResponse(res, "Unable to delete image");
    }
  },
};

module.exports = ProductImagesController;
