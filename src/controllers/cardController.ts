import { Request, Response } from "express";
import connection  from "../databases/database";
import * as mycardRepository from "../repositories/myCardRepository"
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export async function createCard(req: Request,res: Response) {
    const apiKey = req.headers["x-api-key"]
    const {employeeId, type} = req.body
    faker.locale = 'pt_BR'
    
    //dúvida: essa validação abaixo fica aqui, no middleware ou no service? fiquei na dúvida pois no notion ele separa isso das regras de negocio
    if((type !== 'groceries') && (type !== 'restaurant') && (type !==  'transport') &&
     (type !== 'education') && (type !== 'health')){
        return res.status(500).send("tipo de cartão não permitido")
     }

     //regra de negócio: verificando se a chave da API pertence a alguma empresa 
     const {rows: lookingKey}:any  = await connection.query('SELECT * FROM companies WHERE "apiKey" = $1', [apiKey])
     if(!lookingKey) {
        return res.status(404).send("Não existe empresa com essa chave cadastrada!")
     }
      //regra de negócio: verificando se o empregado está cadastrado
      const {rows: lookingEmployee} = await mycardRepository.searchEmployee(employeeId)
      if(lookingEmployee.length === 0) {
          return res.status(500).send("O empregado não está cadastrado")
      }
      console.log(lookingEmployee)

  //regra de negócio: verificando se o empregado possui mais de dois cartões com o mesMo tipo 
        const {rows: lookingTypeCards} = await mycardRepository.teste(employeeId, type)
        if(lookingTypeCards.length !== 0) {
            return res.status(500).send("Não é possível ter mais de 1 cartão com o mesmo número")
        }

// regra de negocio: gerando número do cartao
        const cardNumber = faker.finance.creditCardNumber()
        console.log("o número é " + cardNumber)

 // regra de negócio: Imprimindo nome do cartão pro formato pedido
        const nameCard: string = await mycardRepository.changeName(lookingEmployee)
        
        console.log(nameCard.toUpperCase())

// regra de negócio: data de expiração será dia atual mais 5 anos
        const month = dayjs().month();
        const futureYear = Number(dayjs().year()) + 5
        const date = `${month}/${futureYear}`
        console.log(date)

// regra de negócio: gerando CVC
        const cvc = faker.finance.creditCardCVV()
        console.log("o cvc é: " + cvc)
        return res.send("ok")
}