import * as rechargesRepository from "../repositories/rechargeRepository"
import * as mycardRepository from "../repositories/myCardRepository"
import * as cardServices from "../services/cardServices"
import dayjs from "dayjs";

export async function postRecharges(apiKey: any, cardId: number, amount: number){

//regra de negócio: verificando se a chave da API pertence a alguma empresa 
const {rows: lookingKey}:any  = await mycardRepository.searchKey(apiKey)
console.log(lookingKey)
if(lookingKey.length === 0) {
    throw { code: "notFound", message: "Não existe empresa com essa chave cadastrada!" };
}


//regra de negócio: cartões cadastrados devem receber recargas
const lookingCard = await rechargesRepository.findByCardId(cardId)
if(lookingCard.length === 0) {
    throw { code: "notFound", message: "Cartão não cadastrado!" };
}

// Regra de negócio: somente cartões ativos devem receber recargas
if(lookingCard[0].password === null){
    throw { code: "Unauthorized", message: "Cartão não está ativado" };
}

//Regra de negócio: Somente cartões não expirados devem receber recargas
const expiration = cardServices.verifyExpirationDate(lookingCard)

const makeRecharges = await rechargesRepository.insert(cardId, amount)
}