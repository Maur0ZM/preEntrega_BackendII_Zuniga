import { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/mongodb/user.model.js";
import { isValidPassword } from "../utils.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Registro
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const userEmail = await userModel.findOne({ email });
    if (userEmail)
      return res.status(406).json({ error: "El email ya está en uso" });
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const validPassword = isValidPassword(user, password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET || "coderSecret",
      { expiresIn: "24h" }
    );

    // Enviar la cookie con el token
    res
      .cookie("tokenCookie", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      })
      .json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
