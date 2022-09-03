import { Router } from "express";
import { createCard, ativateCard } from "../controllers/cardController";


const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put('/ativate', ativateCard)


export default cardRouter;
