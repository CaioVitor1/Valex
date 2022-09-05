import { Router } from "express";
import { createPayment } from "../controllers/paymentsController";
import { validateSchema } from "../middlewares/schemaValidator";
import newPaymentSchema from "../schemas/paymentsSchema";

const paymentsRouter = Router();

paymentsRouter.post("/payments", validateSchema(newPaymentSchema), createPayment);


export default paymentsRouter;
