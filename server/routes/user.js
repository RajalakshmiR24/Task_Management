const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const protect = require("../middlewares/authMiddleware"); 
const userValidation = require("../utils/userValidation"); // Import validation middleware


router.post("/register",userValidation.validateRegister, userController.register);

router.post("/login",userValidation.validateLogin, userController.login);



module.exports = router;
