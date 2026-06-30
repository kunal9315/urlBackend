import express from "express";
const userRoutes = express.Router();

import { handelSignup, handelLogin, handelLogout } from "../controllers/user.controller.js";

userRoutes.post("/signup", handelSignup);
userRoutes.post("/login", handelLogin);
userRoutes.post("/logout", handelLogout);

export default userRoutes;

