import { Request, Response } from "express";
import * as paymentServices from "../services/paymentServices"


export async function createPayment(req: Request,res: Response) {
    const {cardId, password, amount, businessId} = req.body
    console.log(cardId, password, amount)

    const tryPayment = await paymentServices.checkPayment(cardId, password, amount, businessId)
return res.send("Pagamento concluído com sucesso!")
}