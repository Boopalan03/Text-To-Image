// backend/routes/generateRoute.js
import { Router } from "express";
import { generateImage } from "../controllers/generateController.js";

const router = Router();

// POST /api/generate-image
router.post("/", generateImage);

export default router;
