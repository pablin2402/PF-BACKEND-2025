const expres = require("express");
const router = expres.Router();

const inventoryController = require("../controllers/InventoryController");
const inventaryManagementController = require("../controllers/InventaryManagementController");

router
.post("/inventory/list", inventoryController.getListOfInventary)
.post("/inventory", inventoryController.postInventary)
.delete("/inventoryManagement/id", inventaryManagementController.deleteInventaryManagement)
.put("/inventory/id", inventoryController.updateQuantity)
.post("/inventory/id", inventoryController.getInventaryByProductId)
.post("/inventoryManagement/userid", inventaryManagementController.getListOfInventaryManagement)
.post("/inventoryManagement/id", inventaryManagementController.postInventaryManagement)

module.exports = router;