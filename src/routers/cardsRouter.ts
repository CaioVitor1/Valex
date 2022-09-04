import { Router } from "express";
import { createCard, ativateCard, getBalance, blockedCard, unblockedCard } from "../controllers/cardController";


const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put('/ativate', ativateCard)
cardRouter.get('/balance/:cardId', getBalance)
cardRouter.put('/blocked', blockedCard)
cardRouter.put('/unblocked', unblockedCard)

export default cardRouter;
