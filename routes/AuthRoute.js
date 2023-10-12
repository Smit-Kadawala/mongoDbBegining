const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/authUser/register", AuthController.register);
router.post("/authUser/loginUser", AuthController.loginUser);

module.exports = router;
