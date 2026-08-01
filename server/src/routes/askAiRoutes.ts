import { Router } from "express";
import { askAi } from "../controllers/askAiController";


const router = Router();



router.post("/", askAi);

export default router;

