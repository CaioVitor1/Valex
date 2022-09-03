import { Request, Response } from "express";
import * as mycardRepository from "../repositories/myCardRepository"
import * as cardServices from "../services/cardServices"




export async function createCard(req: Request,res: Response) {
    const apiKey = req.headers["x-api-key"]
    const {employeeId, type} = req.body
    if(!employeeId || !type) {
        return res.status(400).send("Envio incorreto")
    }
        const verifyDates = await cardServices.verifydatesNewCard(apiKey,employeeId, type)
        return res.status(201).send("Novo cartão criado")
}

export async function ativateCard(req: Request,res: Response) {
        const {cardId, decryptedCvc, password} = req.body
        if(!cardId || !decryptedCvc ||!password) {
            return res.status(400).send("Envio incorreto")
        }
        const tryActiveCard = await cardServices.tryActive(cardId, decryptedCvc, password)
        return res.send("ok")

}