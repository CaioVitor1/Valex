<img height="100" width="500" src="src/assets/valex.svg" /> <br>

# Valex

# Tabela de Conteúdos

* [Sobre](#sobre)
* [Documentação](#documentacao)
* [Tecnologias](#tecnologias)

# Sobre
<h3> Nesse projeto foi construída uma API de cartões de benefícios usando Typescript. A API será responsável pela criação, recarga, ativação, assim como o processamento das compras.</h3>
  <br>


# Documentação
<details>
    <summary><font color="yellow" size="4">Cartões: Rotas no cardRouter </font></summary>
        <details>
            <summary><font color="gray" size="4">Criação: Rota ('/card')  </font></summary> <br>
            <h2> -  Nessa rota, empresas com uma chave de API válida podem criar cartões para os seus empregados. Para um cartão ser criado precisamos do identificador do empregado e do tipo do cartão. </h2>
            <h3> Validações: </h3><br>
                <h4> - A chave de API deverá ser recebida no header `x-api-key`</h4>
                <h4> - O tipo do cartão só deve ser uma das seguintes opções: 'groceries', 'restaurants', 'transport', 'education', 'health'</h4>
            <h3>Regras de negócio</h3>
            <h4>- A chave de API deve pertencer a alguma empresa </h4>
            <h4>- Somente empregados cadastrados podem ter cartões</h4>
            <h4>- Empregados não podem ter mais de um cartão do mesmo tipo </h4>
            <h4>- Utilize a biblioteca [faker](https://fakerjs.dev/guide/#overview) para gerar o número do cartão</h4>
            <h4>- O nome no cartão deve estar no formato `primeiro nome + iniciais de nomes do meio + ultimo nome` (tudo em caixa alta).</h4>
            <h4> - Considere nomes do meio apenas nomes que possuírem 3 letras ou mais
                   Ex: para o nome José da Silva Rodrigues o seguinte nome deverá ser gerado `JOSÉ S RODRIGUES`</h4>
                <h4>- A data de expiração deverá ser o dia atual 5 anos a frente e no formato `MM/YY`
                     Ex: para a data `02/04/2022` a seguinte data de expiração deverá ser gerada
                     `04/27`</h4>
                <h4>- O código de segurança (CVC) deverá ser persistido de forma criptografado, por ser um dado sensível
                    <h4>- Utilize a biblioteca [faker](https://fakerjs.dev/guide/#overview) para gerar o CVC </h4>
                    <h4>- Não podemos utilizar o `bcrypt` para criptografar o CVC, pois, precisaremos dele depois e a maneira que o `bcrypt` utiliza para criptografar é impossível de descriptografar. Utilize a biblioteca [cryptr](https://fakerjs.dev/guide/#overview) no lugar</h4>
        </details>   
        <details>
            <summary><font color="gray" size="4">Ativação: Rota ('/ativate')  </font></summary> <br>
            <h2> -  Nessa rota, empregados podem criar ativar seus cartões, isso significa, gerar uma senha para o cartão. Para um cartão ser ativado precisamos do identificador, do CVC do mesmo e da senha que será cadastrada. </h2>
            <h3>Regras de negócio</h3>
            <h4>- Somente cartões cadastrados devem ser ativados </h4>
            <h4>- Somente cartões não expirados devem ser ativados</h4>
            <h4>- Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo </h4>
            <h4>- O CVC deverá ser recebido e verificado para garantir a segurança da requisição</h4>
            <h4>- A senha do cartão deverá ser composta de 4 números.</h4>
            <h4> - A senha do cartão deverá ser persistida de forma criptografado por ser um dado sensível</h4>
        </details>   
        <details>
            <summary><font color="gray" size="4">Visualização de saldo e transações: Rota ('/balance/:cardId')  </font></summary> <br>
            <h2> -  Nessa rota, empregados podem visualizar o saldo de um cartão e as transações do mesmo. Para isso, precisamos do identificador do cartão. </h2>
            <h3>Regras de negócio</h3>
            <h4>Retorno esperado:</h4>
            <h4>- {
                "balance": 35000,
                "transactions": [
		                        { "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	                            ]
                "recharges": [
		                        { "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	                        ]
                            
} </h4>   
        </details>   
        <details>
            <summary><font color="gray" size="4">Bloqueio de cartão: Rota ('/blocked')  </font></summary> <br>
            <h2> -  Nessa rota, empregados podem bloquear cartões. Para um cartão ser bloqueado precisamos do identificador e da senha do mesmo. </h2>
            <h3>Regras de negócio</h3>
            <h4>- Somente cartões cadastrados devem ser ativados </h4>
            <h4>- Somente cartões não bloqueados devem ser bloqueados</h4>
            <h4>- A senha do cartão deverá ser recebida e verificada para garantir a segurança da requisição </h4>
        </details>
        <details>
            <summary><font color="gray" size="4">Desloqueio de cartão: Rota ('/unblocked')  </font></summary> <br>
            <h2> -  Nessa rota, empregados podem desbloquear cartões. Para um cartão ser bloqueado precisamos do identificador e da senha do mesmo. </h2>
            <h3>Regras de negócio</h3>
            <h4>- Somente cartões cadastrados devem ser ativados </h4>
            <h4>- Somente cartões não bloqueados devem ser bloqueados</h4>
            <h4>- A senha do cartão deverá ser recebida e verificada para garantir a segurança da requisição </h4>
        </details>
</details>

<details>
<summary><font color="yellow" size="4">Recargas: Rota('/recharges') </font></summary>
        <h2>Nessa rota, empresas com uma chave de API válida podem recarregar cartões de seus empregados. Para um cartão ser recarregado precisamos do identificador do mesmo.</h2>
        <h3>Validações: </h3>
            <h4>Somente valores maiores que 0 deveram ser aceitos </h4>
        <h3>Regras de Negócio: </h3>
            <h4> - Somente cartões cadastrados devem receber recargas </h4>
            <h4> - Somente cartões ativos devem receber recargas </h4>
            <h4> - Somente cartões não expirados devem receber recargas </h4>
            <h4> - A recarga deve ser persistida </h4>
        
</details>

<details>
<summary><font color="yellow" size="4">Compras: Rota('/payments') </font></summary> 
        <h2>Nessa rota, empregados podem comprar em Points of Sale (maquininhas). Para uma compra em um POS ser efetuada precisamos do identificador do cartão utilizado e da senha do mesmo, do identificador do estabelecimento e do montante da compra.</h2>
        <h3>Validações: </h3>
            <h4> - Somente valores maiores que 0 deveram ser aceitos </h4>
        <h3>Regras de Negócio: </h3>
            <h4> - Somente cartões cadastrados devem poder comprar </h4>
            <h4> - Somente cartões ativos devem poder comprar </h4>
            <h4> - Somente cartões não expirados devem poder comprar </h4>
            <h4> - Somente cartões não bloqueados devem poder comprar</h4>
            <h4> - A senha do cartão deverá ser recebida e verificada para garantir a segurança da requisição </h4>
            <h4> - Somente estabelecimentos cadastrados devem poder transacionar </h4>
            <h4> - Somente estabelecimentos do mesmo tipo do cartão devem poder transacionar com ele </h4>
            <h4> - O cartão deve possuir saldo suficiente para cobrir o montante da compra</h4>
            <h4> - A compra deve ser persistida </h4>
        
</details>



# Tecnologias

<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" />
          

---

Made with love by <a href='https://www.linkedin.com/in/caiovitor33/'> Caio Vitor </a>

<style>
    button{
        width: 150px;
        height: 41px;
        background: gray;
        border-radius: 10px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.018em;
        color: #FFFFFF;
    }
    </style>

    