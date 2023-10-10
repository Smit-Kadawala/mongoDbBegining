const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/user/", UserController.index);
router.post("/user/show", UserController.show);
router.post("/user/store", UserController.store);
router.post("/user/updateUser", UserController.updateUser);
router.post("/user/destroy", UserController.destroy);

module.exports = router;
