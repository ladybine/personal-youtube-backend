const controllerUser = require("../Controllers/usersControllers");
const express = require("express");
const route = express.Router();

route.post("/", controllerUser.registerUser);
route.get("/", controllerUser.getUser);
route.get("/user/:user", controllerUser.getOneUser);
route.put("/update/:user", controllerUser.updateUser);
module.exports = route;
