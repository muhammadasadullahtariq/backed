const jwt = require("express-jwt");
require("dotenv").config();
const apiResponse = require("../helpers/apiResponse");

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.JWT_SECRET }),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return apiResponse.unauthorizedResponse(res, "Unauthorized");
      }

      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorize;
