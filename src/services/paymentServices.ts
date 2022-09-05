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
console.log(lookingCard)
// Regra de negócio: somente cartões ativos devem receber recargas
if(lookingCard[0].password === null){
    throw { code: "Unauthorized", message: "Cartão não está ativado" };
}

//Regra de negócio: Somente cartões não expirados devem receber recargas
const expiration = await cardServices.verifyExpirationDate(lookingCard)

// Somente cartões não bloqueados devem poder comprar
if(lookingCard[0].isBlocked === true ){
    throw { code: "Unauthorized", message: "Cartão bloqueado" };
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
    let bills = 0
    let recharges = 0;
    //Para calcular o saldo a minha ideia é fazer um for para somar todos os business.amount e todos os transactions.amout. E aí subtrair um do outro.
    console.log(paymentsAmount, rechargesAmount)
    for(let i = 0; i < paymentsAmount.length;i++){
        bills += paymentsAmount[i].soma
        
    }
    for(let i = 0; i < rechargesAmount.length; i++) {
        recharges += rechargesAmount[i].soma
        
    }
    console.log("as contas são " + bills)
    console.log("as recargas são " + recharges)
    balance = recharges - bills 
    const result = balance - amount
console.log(balance)
console.log(result)
if(result < 0) {
    throw { code: "Unauthorized", message: "Saldo insuficiente" };
}else{
    const postPayment = await paymentRepository.insert(cardId, businessId, amount)
}

}



    