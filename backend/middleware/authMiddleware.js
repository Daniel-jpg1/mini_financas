const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não fornecido. Acesso negado."
    });
  }

  // 2. O padrão é: "Bearer tokenAqui"
  const parts = authHeader.split(" ");

  // 3. Valida estrutura do Bearer
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      error: "Formato de token inválido."
    });
  }

  const token = parts[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id
    };

    next();

  } catch (err) {
    return res.status(401).json({
      error: "Token inválido ou expirado."
    });
  }
};
