const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
// const protect = require("../middlewares/authMiddleware"); 
const userValidation = require("../utils/Validation"); // Import validation middleware


userRouter.post("/register",userValidation.validateRegister, userController.register);

userRouter.post("/login",userValidation.validateLogin, userController.login);



module.exports = userRouter;
