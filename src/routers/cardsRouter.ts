import { Router } from "express";
import { createCard, ativateCard, getBalance, blockedCard } from "../controllers/cardController";


const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put('/ativate', ativateCard)
cardRouter.get('/balance/:cardId', getBalance)
cardRouter.put('/blocked', blockedCard)

export default cardRouter;
