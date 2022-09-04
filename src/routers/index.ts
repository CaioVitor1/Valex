import { Router } from "express";
import cardRouter from "./cardsRouter";
import rechargesRouter from "./rechargesRouter";

const router = Router();
router.use(cardRouter);
router.use(rechargesRouter)

export default router;