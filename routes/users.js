const express = require("express");
const router = express.Router();
const userConterller = require("../controllers/users");
const authController = require("../controllers/auth");
router.post("/", userConterller.createUser);
router.get("/", userConterller.findAll);
router.put("/:id", userConterller.updateUser);
router.delete("/:id", userConterller.deleteUser);

module.exports = router;
