const express = require("express");
const router = express.Router();
const storeConterller = require("../controllers/stores");
const { authenticate } = require("../middlewares/auth");
const { onlyStore } = require("../middlewares/onlyStore");

router.post("/", authenticate,onlyStore,storeConterller.createStore);
router.get("/", storeConterller.findAll);
router.put("/:id", storeConterller.updateStore);
router.delete("/:id", storeConterller.deleteStore);

module.exports = router;