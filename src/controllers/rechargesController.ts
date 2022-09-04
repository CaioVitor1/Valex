import { Request, Response } from "express";
import * as rechargesServices from "../services/rechargesServices"

export async function recharges(req: Request,res: Response){
    const apiKey = req.headers["x-api-key"]
    const {cardId, amount} = req.body 
    console.log(apiKey, cardId, amount)
    const tryRecharges = await rechargesServices.postRecharges(apiKey, cardId, amount)
    return res.send("Recarga realizada com sucesso!")
}