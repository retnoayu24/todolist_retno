import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../models/userModel.js";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    // Cek apakah username sudah digunakan
    const existingUsername =
      await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username sudah digunakan",
      });
    }

    // Cek apakah email sudah digunakan
    const existingEmail =
      await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email sudah digunakan",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Simpan user
    const userId = await createUser(
      username,
      email,
      hashedPassword
    );

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        id: userId,
        username,
        email,
      },
    });
  } catch (error) {
    console.error(
      "Register error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const {
      username,
      password,
    } = req.body;

    // Cari user
    const user =
      await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // Bandingkan password
    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    const secret =
      process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        success: false,
        message:
          "JWT_SECRET belum dikonfigurasi",
      });
    }

    // Buat JWT
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}