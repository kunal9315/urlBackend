import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const handelSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const expiryDate = new Date(Date.now() + 86400000);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 86400000,
            expires: expiryDate
        });

        res.status(201).json({ success: true, token, user: { name: newUser.name, email: newUser.email }, message: 'User registered successfully' });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

export const handelLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const expiryDate = new Date(Date.now() + 86400000);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 86400000,
            expires: expiryDate
        });
        res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

export const handelLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};