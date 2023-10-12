const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const authenticate = require("../middleware/authenticate");

router.get("/user/", authenticate, UserController.index);
router.post("/user/show", authenticate, UserController.show);
router.post("/user/store", authenticate, UserController.store);
router.post("/user/updateUser", authenticate, UserController.updateUser);
router.post("/user/destroy", authenticate, UserController.destroy);

module.exports = router;
