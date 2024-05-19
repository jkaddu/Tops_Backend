const express = require("express");
const router = express.Router();
const getAllUsersController = require("../controllers/getAllUsersController");

router.get("/", getAllUsersController.getAllUsers);

module.exports = router;
