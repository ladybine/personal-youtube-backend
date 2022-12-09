const controllerUser= require("../Controllers/usersControllers")
const express= require("express")
const route= express.Router()

route.post("/", controllerUser.registerUser);
route.get("/", controllerUser.getUser);

module.exports=route