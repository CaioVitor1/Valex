import { Router } from "express";
import cardRouter from "./cardsRouter";
import paymentsRouter from "./paymentsRouter";
import rechargesRouter from "./rechargesRouter";

const router = Router();
router.use(cardRouter);
router.use(rechargesRouter)
router.use(paymentsRouter)
export default router;