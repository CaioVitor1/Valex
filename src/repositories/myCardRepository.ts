import connection  from "../databases/database";

export async function searchKey(apiKey:any) {
  return await connection.query('SELECT * FROM companies WHERE "apiKey" = $1', [apiKey])
}

export async function searchNumberCard(employeeId: number, type:string) {
    return await connection.query(
        `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
        [type, employeeId]
      );
}

export async function searchEmployee(employeeId: number) {
  return await connection.query('SELECT * FROM employees WHERE id = $1', [employeeId])
}

export async function insertCard(employeeId: number, cardNumber: string, nameCard: string, encryptedCvc: string,expirationDate: string, type:string) {
  return await connection.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", "isVirtual", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `,
    [
      employeeId,
      cardNumber,
      nameCard,
      encryptedCvc,
      expirationDate,
      true,
      true,
      type
    ]
  );
} 

export async function seachCard(cardId: number) {
return await connection.query('SELECT * FROM cards WHERE id = $1', [cardId])
}

export async function activeCard(cardId: number, encryptedPassword: string){
  return await connection.query('UPDATE cards SET password = $1 WHERE id = $2;', [encryptedPassword, cardId])
}

export async function searchBusiness(cardId: number){
return await connection.query(`
SELECT payments.id, payments."cardId", payments."businessId", businesses.name AS businessName,
payments.timestamp, payments.amount
FROM payments JOIN businesses 
ON payments."businessId" = businesses.id
WHERE payments."cardId" = $1;
`, [cardId])
}

export async function searchRecharges(cardId: number){
return await connection.query(`
SELECT recharges.id, recharges."cardId", recharges.timestamp, recharges.amount
FROM recharges
WHERE recharges."cardId" = $1;
`, [cardId])
}

export async function blokingCard(cardId: number) {
return await connection.query('UPDATE cards SET "isBlocked" = true WHERE id = $1;', [cardId])
}