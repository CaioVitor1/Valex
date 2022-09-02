import connection  from "../databases/database";

export async function teste(employeeId: number, type:string) {
    return await connection.query(
        `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
        [type, employeeId]
      );
}

export async function searchEmployee(employeeId: number) {
  return await connection.query('SELECT * FROM employees WHERE id = $1', [employeeId])
}

export async function changeName(lookingEmployee:any) {
  const array = lookingEmployee[0].fullName.split(" ")
        
        if(array[1].length >= 3){
            return array[0] + " " + array[1][0] + " " + array[array.length-1]
            
        }else {
            return (array[0] + " " + array[2][0] + " " + array[array.length-1])
          
        }

}