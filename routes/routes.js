const express = require("express");
// const { authenticateToken } = require('../middlewares/authenticationMiddleware');

const routes = express.Router();

// routes.use(authenticateToken);


routes.use("/user", require("./userRoutes"));
routes.use("/recipe", require("./recipeRoutes"));   
routes.use("/comment", require("./commentRoutes"));
module.exports = { routes };