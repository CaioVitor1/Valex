import * as rechargesRepository from "../repositories/rechargeRepository"
import * as mycardRepository from "../repositories/myCardRepository"
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
const data = lookingCard[0].expirationDate
const array = data.split("/")
const month = (dayjs().month())
const year = Number(dayjs().year())
console.log(array, month, year)
    if((Number(array[1]) < year) || (Number(array[1]) <= 2022 && Number(array[0]) < month)) {
        throw { code: "Unauthorized", message: "Cartão com validade expirada" };
    }

const makeRecharges = await rechargesRepository.insert(cardId, amount)
}