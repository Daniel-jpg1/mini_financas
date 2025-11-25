module.exports = function errorMiddleware(err, req, res, next) {
  console.error("🔥 ERRO CAPTURADO:", err.message);

  return res.status(500).json({
    error: err.message || "Erro interno no servidor"
  });
};
