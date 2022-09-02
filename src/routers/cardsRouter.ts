import { Router } from "express";
import { createCard } from "../controllers/cardController";


const cardRouter = Router();

cardRouter.post("/card", createCard);


export default cardRouter;
