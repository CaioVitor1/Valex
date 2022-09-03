import * as mycardRepository from "../repositories/myCardRepository"
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from 'bcrypt';

export async function verifydatesNewCard(apiKey: any,employeeId: number, type: string) {
    faker.locale = 'pt_BR'

//dúvida: essa validação abaixo fica aqui, no middleware ou no service? fiquei na dúvida pois no notion ele separa isso das regras de negocio
if((type !== 'groceries') && (type !== 'restaurant') && (type !==  'transport') &&
(type !== 'education') && (type !== 'health')){
   throw { code: "Unauthorized", message: "tipo de cartão não permitido!" };
   //res.status(500).send("tipo de cartão não permitido")
}

//regra de negócio: verificando se a chave da API pertence a alguma empresa 
const {rows: lookingKey}:any  = await mycardRepository.searchKey(apiKey)
console.log(lookingKey)
if(!lookingKey) {
    throw { code: "notFound", message: "Não existe empresa com essa chave cadastrada!" };
}

 //regra de negócio: verificando se o empregado está cadastrado
 const {rows: lookingEmployee} = await mycardRepository.searchEmployee(employeeId)
 if(lookingEmployee.length === 0) {
    throw { code: "Unauthorized", message: "O empregado não está cadastrado" };
 }

  //regra de negócio: verificando se o empregado possui mais de dois cartões com o mesMo tipo 
  const {rows: lookingTypeCards} = await mycardRepository.searchNumberCard(employeeId, type)
  if(lookingTypeCards.length !== 0) {
    throw { code: "Unauthorized", message: "Não é possível ter mais de 1 cartão com do mesmo tipo" };
  }

// regra de negocio: gerando número do cartao
const cardNumber = faker.finance.creditCardNumber()
console.log(typeof cardNumber)
console.log("o número é " + cardNumber)

// regra de negócio: Imprimindo nome do cartão pro formato pedido
const name: string = changeName(lookingEmployee)        
const nameCard = name.toUpperCase()
console.log(nameCard)

// regra de negócio: data de expiração será dia atual mais 5 anos
const month = dayjs().month();
const futureYear = Number(dayjs().year()) + 5
const expirationDate = `${month}/${futureYear}`
console.log(expirationDate)

// regra de negócio: gerando CVC
const cvc = faker.finance.creditCardCVV()
const cryptr = new Cryptr('myTotallySecretKey');
const encryptedCvc = cryptr.encrypt(cvc);
//const decryptedCvc = cryptr.decrypt(encryptedCvc); (para desencriptar)
console.log("o cvc é: " + cvc)
console.log("o cvc encriptado é: " + encryptedCvc)

const insertCard = await mycardRepository.insertCard(employeeId, cardNumber, nameCard, encryptedCvc,expirationDate, type)

}

function changeName(lookingEmployee:any) {
    const array = lookingEmployee[0].fullName.split(" ")
          
          if(array[1].length >= 3){
              return array[0] + " " + array[1][0] + " " + array[array.length-1]
              
          }else {
              return (array[0] + " " + array[2][0] + " " + array[array.length-1])
            
          }
  
  }

  export async function tryActive(cardId: number, decryptedCvc: string, password: number) {

    //Regra de negócio: apenas cartões cadastrados devem ser ativados
    const {rows: lookingCard} = await mycardRepository.seachCard(cardId)
    if(!lookingCard) {
        throw { code: "notFound", message: "Card não cadastrado!" };
    }
    console.log(lookingCard)
    
    // Regra de negócio: Somente cartões não expirados devem ser ativados
    const data = lookingCard[0].expirationDate
    const array = data.split("/")
    const month = (dayjs().month())
    const year = Number(dayjs().year())
    console.log(array, month, year)
    if((Number(array[1]) < year) || (Number(array[1]) <= 2022 && Number(array[0]) < month)) {
        throw { code: "Unauthorized", message: "Cartão com validade expirada" };
    }

    //Regra de negócio: apenas cartões não ativados devem ser ativados
    if(lookingCard[0].isBlocked === false) {
        throw { code: "Unauthorized", message: "Cartão já está ativado" };
    }

    //Regra de negócio: O CVC deverá ser recebido e verificado
    const cryptr = new Cryptr('myTotallySecretKey');
    const decrypted = (cryptr.decrypt(lookingCard[0].securityCode));
    if(Number(decryptedCvc) !==  Number(decrypted)){
        throw { code: "Unauthorized", message: "Código de segurança inválido!" };
    }
 
    //Regra de negócio: senha com 4 números
    if(typeof password === "string" || (password.toString()).length !== 4) {
        throw { code: "Unprocessable_Entity", message: "senha incorreta!" };
    }

    //Regra de negócio: encriptar a senha
    const encryptedPassword = bcrypt.hashSync(password.toString(), 10);
    console.log(encryptedPassword)

    const active = await mycardRepository.activeCard(cardId)

  }