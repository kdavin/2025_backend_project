const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { onlyStore } = require("../middlewares/onlyStore");
const productConterller = require("../controllers/products");

router.post("/", authenticate, onlyStore, productConterller.createProduct);
router.get("/", productConterller.findAll);
router.put("/:id", authenticate, onlyStore, productConterller.updateProduct);
router.delete("/:id", authenticate, onlyStore, productConterller.deleteProduct);
router.get("/:keyword", productConterller.findProductByName);
module.exports = router;
