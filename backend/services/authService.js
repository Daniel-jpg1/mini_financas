const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sequelize model

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado no .env");
}

module.exports = {
  async register({ name, email, password }) {
    // 1. verificar se email existe
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new Error("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return safeUser;
  },

  async login({ email, password }) {

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" } // token dura 7 dias
    );

    return token;
  }
};
