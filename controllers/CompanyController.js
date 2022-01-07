const mongoose = require("mongoose");
const { body } = require("express-validator");

const ProductCatalog = require("../models/ProductCatalogModel");
const Company = require("../models/CompanyModel");
const apiResponse = require("../helpers/apiResponse");
const validationResult = require("../middlewares/validationResult");

let CompanyController = {
  find: async (req, res) => {
    try {
      let id = req.params.id;

      //Checking if company exists
      let company = await Company.findById(id, "name");
      if (company === null)
        return apiResponse.notFoundResponse(res, "Company not found");

      //Returning success response
      return apiResponse.successResponseWithData(res, "Data Found", company);
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to load Company");
    }
  },
  all: async (req, res) => {
    try {
      //Getting all companies
      let companies = await Company.find({}, "name");
      return apiResponse.successResponseWithData(res, "Data Found", companies);
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to load companies");
    }
  },
  create: [
    body("name", "Name is Required").isLength({ min: 1 }).trim(),
    validationResult,
    async (req, res) => {
      try {
        let newCompany = new Company(req.body);
        let company = await newCompany.save();
        apiResponse.successResponseWithData(res, "Company Created", {
          id: company.id,
          name: company.name,
        });
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to create Company");
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

        //Checking if company exists
        let company = await Company.findById(id);
        if (company === null)
          return apiResponse.notFoundResponse(res, "Company not found");

        //Updating companies
        company.name = name;
        let updatedCompany = await company.save();
        return apiResponse.successResponseWithData(res, "Company Updated", {
          id: id,
          name: name,
        });
      } catch (err) {
        return apiResponse.errorResponse(res, "Unable to update Companies");
      }
    },
  ],
  delete: async (req, res) => {
    try {
      let id = req.params.id;

      //Checking if id is valid
      if (!mongoose.Types.ObjectId.isValid(id))
        return apiResponse.validationError(res, "Invalid Id");

      //Checking if company exists
      let company = await Company.findById(id, "_id name");
      if (company === null)
        return apiResponse.notFoundResponse(res, "Company not found");

      //Checking if company have products
      if ((await ProductCatalog.find({ company: id }).countDocuments()) > 0)
        return apiResponse.validationError(
          res,
          "Cannot delete company with product(s)"
        );

      //Deleting company
      await Company.findByIdAndDelete(id);
      return apiResponse.successResponse(res, "Company Deleted");
    } catch (err) {
      return apiResponse.errorResponse(res, "Unable to delete Company");
    }
  },
};

module.exports = CompanyController;
