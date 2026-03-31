import { sql } from "#config/db.js";

export const getUserByPhone = async (phoneNumber: string) => {
    const result = await sql`SELECT * FROM "user" WHERE "phoneNumber" = ${phoneNumber}`;
    console.log(result);
    return result;
}