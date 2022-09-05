import * as cardServices from "../services/cardServices";
import * as businessRepository from "../repositories/businessRepository"
import * as rechargeRepository from "../repositories/rechargeRepository"
import * as paymentRepository from "../repositories/paymentRepository"
import dayjs from "dayjs";
import bcrypt from 'bcrypt';

export async function checkPayment(cardId: number, password: string, amount: number, businessId:number){
//Regra de negócio
 const lookingCard = await cardServices.returnLookingCard(cardId);
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

 //Regra de negócio: comparando a senha
    if(!bcrypt.compareSync(password, lookingCard[0].password)){
        throw { code: "Unauthorized", message: "Senha incorreta" };
    }

//Regra de negócio: apenas estabelecimentos cadastrados podem transacionar
const id = businessId
const verifyBusiness = await businessRepository.findById(id)
console.log(verifyBusiness)
if(!verifyBusiness) {
    throw { code: "notFound", message: "Não existe estabelecimento com essa chave cadastrada!" };
}

//Regra de negócio: Somente estabelecimentos do mesmo tipo do cartão devem poder transacionar com ele
console.log(verifyBusiness.type, lookingCard[0].type)
if(verifyBusiness.type !== lookingCard[0].type){
    throw { code: "notFound", message: "Cartão de um tipo diferente do estabelecimento!" };
}

//Regra de negócio: O cartão deve possuir saldo suficiente para cobrir o montante da compra
let {rows: rechargesAmount} = await rechargeRepository.verifyAmount(cardId)
let {rows: paymentsAmount} = await paymentRepository.verifyAmount(cardId)
let balance = 0;
console.log(rechargesAmount[0].soma)
console.log(paymentsAmount[0].soma)
if(rechargesAmount.length === 0 ) {
    throw { code: "Unauthorized", message: "Saldo insuficiente" };
}if(paymentsAmount.length === 0){
    balance = Number(rechargesAmount[0].soma)
}if(rechargesAmount.length !== 0 && paymentsAmount.length !== 0){
    balance = Number(rechargesAmount[0].soma) - Number(paymentsAmount[0].soma)
}
console.log(balance, amount)
const bill = balance - amount
if(bill < 0) {
    throw { code: "Unauthorized", message: "Saldo insuficiente" };
}else{
    //const postPayment = await paymentRepository.insert(cardId, businessId, amount)
}

}



    