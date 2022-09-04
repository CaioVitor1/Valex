import { Router } from "express";
import { recharges } from "../controllers/rechargesController";
import { validateSchema } from "../middlewares/schemaValidator";
import newRechargesSchema from "../schemas/rechargesSchema";



const rechargesRouter = Router();

rechargesRouter.post("/recharges", validateSchema(newRechargesSchema), recharges);


export default rechargesRouter;
