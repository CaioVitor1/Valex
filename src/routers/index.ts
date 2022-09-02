import { Router } from "express";
import cardRouter from "./cardsRouter";

const router = Router();
router.use(cardRouter);

export default router;