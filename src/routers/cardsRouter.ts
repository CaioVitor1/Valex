import { Router } from "express";
import { createCard, ativateCard, getBalance, blockedCard, unblockedCard } from "../controllers/cardController";
import { validateSchema } from "../middlewares/schemaValidator";
import * as cardSchema from "../"
import { newCardSchema, ativateSchema } from "../schemas/cardSchema";


const cardRouter = Router();

cardRouter.post("/card", validateSchema(newCardSchema), createCard);
cardRouter.put('/ativate', validateSchema(ativateSchema), ativateCard)
cardRouter.get('/balance/:cardId', getBalance)
cardRouter.put('/blocked', blockedCard)
cardRouter.put('/unblocked', unblockedCard)

export default cardRouter;
