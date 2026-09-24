import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';


// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Hash password sebelum disimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru ke database
        await UserModel.create(username, email, hashedPassword);

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil!'
        });

    } catch (error: any) {
        console.error('ERROR REGISTER:', error);

        // Jika username atau email sudah terdaftar
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({
                success: false,
                message: 'Username atau Email sudah terdaftar!'
            });
            return;
        }

        // Jika terjadi error lainnya
        res.status(500).json({
            success: false,
            message: 'Error server.'
        });
    }
};


// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        // Cari user berdasarkan username
        const user = await UserModel.findByUsername(username);

        // Cek apakah user ada dan password sesuai
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({
                success: false,
                message: 'Username atau password salah!'
            });
            return;
        }

        // Buat JWT Token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            token
        });

    } catch (error: any) {
        console.error('ERROR LOGIN:', error);

        res.status(500).json({
            success: false,
            message: 'Error server.'
        });
    }
};