const mongoose = require("mongoose");
const { body } = require("express-validator");

const Category = require("../models/CategoryModel");
const ProductCatalog = require("../models/ProductCatalogModel");
const apiResponse = require("../helpers/apiResponse");
const validationResult = require("../middlewares/validationResult");

let CategoryController = {
  find: async (req, res) => {
    try {
      let id = req.params.id;

      //Checking if category exists
      let category = await Category.findById(id, "name");
      if (category === null)
        return apiResponse.notFoundResponse(res, "Category not found");

      return apiResponse.successResponseWithData(res, "Data Found", category);
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to load category");
    }
  },
  all: async (req, res) => {
    try {
      //Getting all categories
      let categories = await Category.find({}, "name");
      return apiResponse.successResponseWithData(res, "Data Found", categories);
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to load categories");
    }
  },
  create: [
    body("name", "Name is Required").isLength({ min: 1 }).trim(),
    validationResult,
    async (req, res) => {
      try {
        //Creating Category
        let newCategory = new Category(req.body);
        let category = await newCategory.save();
        apiResponse.successResponseWithData(res, "Category Created", {
          id: category.id,
          name: category.name,
        });
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to create category");
      }
    },
  ],
  update: [
    body("name", "Name is Required").isLength({ min: 1 }).trim(),
    validationResult,
    async (req, res) => {
      try {
        let id = req.params.id;
        let name = req.body.name;

        //Checking if category exists
        let category = await Category.findById(id);
        if (category === null)
          return apiResponse.notFoundResponse(res, "Category not found");

        //Updating category
        category.name = name;
        await category.save();
        return apiResponse.successResponseWithData(res, "Category Updated", {
          id: id,
          name: name,
        });
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to update category");
      }
    },
  ],
  delete: async (req, res) => {
    try {
      let id = req.params.id;

      //Checking if category exists
      let category = await Category.findById(id);
      if (category === null)
        return apiResponse.notFoundResponse(res, "Category not found");

      //Checking if category has products
      if ((await ProductCatalog.find({ category: id }).countDocuments()) > 0)
        return apiResponse.validationError(
          res,
          "Cannot delete category with product(s)"
        );

      //Deleting category
      await Category.findByIdAndDelete(id);
      return apiResponse.successResponse(res, "Category Deleted");
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to delete Category");
    }
  },
};

module.exports = CategoryController;
