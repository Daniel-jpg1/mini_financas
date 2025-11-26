const router = require("express").Router();
const installmentController = require("../controllers/installmentController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, installmentController.create);
router.get("/:debt_id", auth, installmentController.index);
router.put("/:id", auth, installmentController.update);
router.delete("/:id", auth, installmentController.delete);

module.exports = router;
