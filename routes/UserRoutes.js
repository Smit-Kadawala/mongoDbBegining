const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/", UserController.index);
router.post("/show", UserController.show);
router.post("/store", UserController.store);
router.post("/updateUser", UserController.updateUser);
router.post("/destroy", UserController.destroy);

module.exports = router;
