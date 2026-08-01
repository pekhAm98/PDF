import { Router } from "express";
import { askAi } from "../controllers/askAiController";


const router = Router();



router.get("/", askAi);

export default router;

