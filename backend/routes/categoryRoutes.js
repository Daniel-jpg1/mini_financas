const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, categoryController.create);
router.get("/", auth, categoryController.index);
router.put("/:id", auth, categoryController.update);
router.delete("/:id", auth, categoryController.delete);

module.exports = router;
