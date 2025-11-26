const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, transactionController.create);
router.get("/", auth, transactionController.index);
router.put("/:id", auth, transactionController.update);
router.delete("/:id", auth, transactionController.delete);

module.exports = router;
