const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { onlyStore } = require("../middlewares/onlyStore");
const productConterller = require("../controllers/products");

router.post("/", authenticate,onlyStore,productConterller.createProduct);
router.get("/", productConterller.findAll);
router.put("/:id", productConterller.updateProduct);
router.delete("/:id", productConterller.deleteProduct);

module.exports = router;