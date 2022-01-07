const mongoose = require("mongoose");
const { body } = require("express-validator");

const Product = require("../models/ProductModel");
const Company = require("../models/CompanyModel");
const Category = require("../models/CategoryModel");
const Purchase = require("../models/PurchaseModel");
const apiResponse = require("../helpers/apiResponse");
const validationResult = require("../middlewares/validationResult");
const UserRoles = require("../helpers/userRoles");

// Product Schema
function ProductData(data) {
  this.id = data.id;
  this.name = data.name;
  this.images = data.images;
  this.description = data.description;
  this.category = {
    id: data.category.id,
    name: data.category.name,
  };
  this.company = {
    id: data.company.id,
    name: data.company.name,
  };
  this.inStock = data.inStock;
  this.sellingPrice = data.sellingPrice;
  this.isFeatured = data.isFeatured;
}

let ProductController = {
  find: async (req, res) => {
    try {
      let id = req.params.id;

      //Checking if id is valid
      if (!mongoose.Types.ObjectId.isValid(id))
        return apiResponse.validationError(res, "Invalid Id");

      //Checking if found exists
      let product = await Product.findById(
        id,
        "_id name images company category inStock description sellingPrice isFeatured"
      )
        .populate("company", "_id name")
        .populate("category", "_id name");
      if (product === null)
        return apiResponse.notFoundResponse(res, "Product not found");

      //Return success response
      return apiResponse.successResponseWithData(res, "Data Found", product);
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to load product");
    }
  },
  all: async (req, res) => {
    try {
      let { fields } = req.query;

      //Getting product
      let products = await Product.find(
        req.user.role === UserRoles.Customer ? { inStock: { $gt: 0 } } : {},
        fields
          ? fields
          : "name images company category inStock description sellingPrice isFeatured"
      )
        .populate("company", "_id name")
        .populate("category", "_id name");
      return apiResponse.successResponseWithData(res, "Data Found", products);
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to load products");
    }
  },
  create: [
    body("name", "name should not be empty").isLength({ min: 1 }).trim(),
    body("sellingPrice", "valid selling price is required").isFloat(),
    validationResult,
    async (req, res) => {
      try {
        let { companyId, categoryId } = req.body;

        // Checking if companyId is Valid object Id
        if (!mongoose.Types.ObjectId.isValid(companyId))
          return apiResponse.validationError(res, "Invalid Company Id");

        // Checking if categoryId is Valid object Id
        if (!mongoose.Types.ObjectId.isValid(categoryId))
          return apiResponse.validationError(res, "Invalid Category Id");

        //Checking if company exists
        let company = await Company.findById(companyId);
        if (company === null)
          return apiResponse.notFoundResponse(res, "Company not found");

        //Checking if category exists
        let category = await Category.findById(categoryId);
        if (category === null)
          return apiResponse.notFoundResponse(res, "Category not found");

        //Creating Product
        let newProduct = new Product({
          ...req.body,
          company: company,
          category: category,
        });
        let product = await newProduct.save();

        apiResponse.successResponseWithData(
          res,
          "Product Created",
          new ProductData(product)
        );
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to create product");
      }
    },
  ],
  update: [
    body("name", "name should not be empty").isLength({ min: 1 }).trim(),
    body("sellingPrice", "valid selling price is required").isFloat(),
    validationResult,
    async (req, res) => {
      try {
        let { id, companyId, categoryId } = req.body;

        // Checking if id is Valid object Id
        if (!mongoose.Types.ObjectId.isValid(id))
          return apiResponse.validationError(res, "Invalid Id");

        // Checking if companyId is Valid object Id
        if (!mongoose.Types.ObjectId.isValid(companyId))
          return apiResponse.validationError(res, "Invalid Company Id");

        // Checking if categoryId is Valid object Id
        if (!mongoose.Types.ObjectId.isValid(categoryId))
          return apiResponse.validationError(res, "Invalid Category Id");

        //Checking if company exists
        let company = await Company.findById(companyId);
        if (company === null)
          return apiResponse.notFoundResponse(res, "Company not found");

        //Checking if category exists
        let category = await Category.findById(categoryId);
        if (category === null)
          return apiResponse.notFoundResponse(res, "Category not found");

        //Checking if product exists
        let product = await Product.findById(id);
        if (product === null)
          return apiResponse.notFoundResponse(res, "Product not found");

        let { name, sellingPrice, description, isFeatured } = req.body;

        //Updating product
        product.name = name;
        product.sellingPrice = sellingPrice;
        product.isFeatured =
          isFeatured === undefined ? product.isFeatured : isFeatured;
        product.company = company;
        product.category = category;
        product.description = description;
        let update = await product.save();
        return apiResponse.successResponseWithData(
          res,
          "Product Updated",
          new ProductData(update)
        );
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to update product");
      }
    },
  ],
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      //Checking if product id is valid
      if (!mongoose.Types.ObjectId.isValid(id))
        return apiResponse.validationError(res, "Invalid Id");

      //Checking if product exists
      let product = await Product.findById(id);
      if (product === null)
        return apiResponse.notFoundResponse(res, "Product not found");

      //Check if purchase exists against this product
      if ((await Purchase.find({ product: product._id }).count()) > 0)
        return apiResponse.validationError(
          res,
          "Cannot delete a product with purchase(s)"
        );

      //Deleting Product
      await Product.findByIdAndDelete(id);
      return apiResponse.successResponse(res, "Product Deleted");
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to delete product");
    }
  },
};

module.exports = ProductController;
