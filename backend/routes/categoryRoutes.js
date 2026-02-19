const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/authMiddleware");

const { validateBody } = require("../middleware/validateBody");
const categorySchema = require("../validators/finance/categorySchema");
const categoryUpdateSchema = require("../validators/finance/categoryUpdateSchema");

router.post("/", auth, validateBody(categorySchema), categoryController.create);
router.get("/", auth, categoryController.index);
router.put("/:id", auth, validateBody(categoryUpdateSchema), categoryController.update);
router.delete("/:id", auth, categoryController.delete);

module.exports = router;
