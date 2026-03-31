const router = require("express").Router();
const installmentController = require("../controllers/installmentController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, installmentController.getAllUserInstallments);
router.get("/debt/:debt_id", auth, installmentController.index);
router.post("/", auth, installmentController.create);
router.put("/:id", auth, installmentController.update);
router.delete("/:id", auth, installmentController.delete);

module.exports = router;
