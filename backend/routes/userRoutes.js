const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/me", auth, userController.me);

module.exports = router;
