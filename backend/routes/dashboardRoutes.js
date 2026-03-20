const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/summary", authMiddleware, dashboardController.summary);

module.exports = router;
