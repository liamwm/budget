"use server"

import mysql, { RowDataPacket } from 'mysql2/promise';


const connection = await mysql.createConnection({
    host: 'budget_devcontainer-db-1',
    user: 'root',
    password: 'root',
    database: 'mydb',
});

const getDateBalanceData = async (startDate: string, endDate: string): Promise<DateBalanceData[]> => {
    const dailyBalanceQuery = `
        WITH RECURSIVE dates_in_range(range_date) AS 
        (
            SELECT ?
            UNION ALL 
            SELECT DATE_ADD(range_date, INTERVAL 1 DAY) FROM dates_in_range WHERE range_date <= ?
        )
        SELECT range_date AS balance_date, 
        (SELECT SUM(amount) FROM transaction WHERE transaction.trans_date <= balance_date) AS balance 
        FROM dates_in_range;
    `;

    try {
        const result = await connection.execute(dailyBalanceQuery, [startDate, endDate]);
        const allDataBalanceData = (result[0] as RowDataPacket[]).map((row: RowDataPacket) => {
            const date = new Date(row.balance_date);
            const dateBalanceData = {
                timestamp: date.getTime(),
                amount: row.balance
            }
            return dateBalanceData;
        });

        return allDataBalanceData;
    } catch (err) {
        console.log(err);
        return [];
    }
};


const getDateDetails = async (dateTimestamp: number): Promise<TransactionData[]> => {
    const dateDetailsQuery = `
        SELECT id, amount, merchant
        FROM transaction
        WHERE trans_date = ?
    `

    const date = new Date(dateTimestamp);
    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    try {
        const result = await connection.execute(dateDetailsQuery, [formattedDate]);
        return (result[0] as RowDataPacket[]).map((row: RowDataPacket) => {
            const transactionData: TransactionData = {
                id: row.id,
                timestamp: date.getTime(),
                amount: row.amount,
                merchant: row.merchant
            }
            return transactionData;
        });
    } catch (err) {
        console.log(err);
        return [];
    }
};


export { getDateBalanceData, getDateDetails };