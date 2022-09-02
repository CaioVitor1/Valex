import { Request, Response } from "express";
import * as mycardRepository from "../repositories/myCardRepository"
import * as cardServices from "../services/cardServices"




export async function createCard(req: Request,res: Response) {
    const apiKey = req.headers["x-api-key"]
    const {employeeId, type} = req.body

        const verifyDates = await cardServices.verifydatesNewCard(apiKey,employeeId, type)
        return res.status(201).send("Novo cartão criado")
}

export async function ativateCard(req: Request,res: Response) {
        
}