const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/accounts", require("./accountRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/debts", require("./debtRoutes"));
router.use("/installments", require("./installmentRoutes"));
router.use("/transactions", require("./transactionRoutes"));

module.exports = router;
