import express from "express";
const router = express.Router();
import authVerifyMiddleware from "../middlewares/authVerify.middleware.js";
import { createShortUrl, getAll, redirectToLongUrl } from "../controllers/url.js";




router.post("/short", authVerifyMiddleware, createShortUrl);

router.get("/getAll", authVerifyMiddleware, getAll);

router.get("/:code", redirectToLongUrl);


export default router;