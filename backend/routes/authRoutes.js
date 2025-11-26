const router = require("express").Router();
const authController = require("../controllers/authController");
const { validateBody } = require("../middleware/validateBody");
const { loginSchema, registerSchema } = require("../validators");

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);

module.exports = router;
