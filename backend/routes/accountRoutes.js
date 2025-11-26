const router = require("express").Router();
const accountController = require("../controllers/accountController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, accountController.create);
router.get("/", auth, accountController.index);
router.put("/:id", auth, accountController.update);
router.delete("/:id", auth, accountController.delete);

module.exports = router;
