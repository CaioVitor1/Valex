import connection  from "../databases/database";

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: Date;
  amount: number;
}
export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  console.log("chegou aqui")
  const result = await connection.query(
    `SELECT * FROM cards WHERE id=$1`,
    [cardId]
  );

  return result.rows;
}

export async function insert(cardId: number, amount: number) {

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );
}

export async function verifyAmount(cardId: number){
  const result = await connection.query(`
  SELECT recharges."cardId", SUM(amount) AS soma
FROM recharges WHERE recharges."cardId" = $1 GROUP BY(recharges."cardId");
`, [cardId])
return result
}
