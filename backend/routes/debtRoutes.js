const router = require("express").Router();
const debtController = require("../controllers/debtController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, debtController.create);
router.get("/", auth, debtController.index);
router.put("/:id", auth, debtController.update);
router.delete("/:id", auth, debtController.delete);

module.exports = router;
