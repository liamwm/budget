import { getConnection } from '@/app/db';
import { RowDataPacket } from 'mysql2/promise';


const cleanTransactionRecord = (row: RowDataPacket): TransactionData => {
    const transactionData: TransactionData = {
        id: row.id,
        timestamp: row.trans_date,
        amount: row.amount,
        merchant: row.merchant,
        description: row.details
    }
    return transactionData;
}

// const getDateBalanceData = async (startDate: string, endDate: string): Promise<DateBalanceData[]> => {
//     const dailyBalanceQuery = `
//         WITH RECURSIVE dates_in_range(range_date) AS 
//         (
//             SELECT ?
//             UNION ALL 
//             SELECT DATE_ADD(range_date, INTERVAL 1 DAY) FROM dates_in_range WHERE range_date <= ?
//         )
//         SELECT range_date AS balance_date, 
//         (SELECT SUM(amount) FROM transaction WHERE transaction.trans_date <= balance_date) AS balance 
//         FROM dates_in_range;
//     `;

//     try {
//         const result = await connection.execute(dailyBalanceQuery, [startDate, endDate]);
//         const allDataBalanceData = (result[0] as RowDataPacket[]).map((row: RowDataPacket) => {
//             const date = new Date(row.balance_date);
//             const dateBalanceData = {
//                 timestamp: date.getTime(),
//                 amount: row.balance
//             }
//             return dateBalanceData;
//         });

//         return allDataBalanceData;
//     } catch (err) {
//         console.log(err);
//         return [];
//     }
// };


// const getDateDetails = async (dateTimestamp: number): Promise<TransactionData[]> => {
//     const dateDetailsQuery = `
//         SELECT id, amount, merchant
//         FROM transaction
//         WHERE trans_date = ?
//     `

//     const date = new Date(dateTimestamp);
//     const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

//     try {
//         const result = await connection.execute(dateDetailsQuery, [formattedDate]);
//         return (result[0] as RowDataPacket[]).map((row: RowDataPacket) => {
//             const transactionData: TransactionData = {
//                 id: row.id,
//                 timestamp: date.getTime(),
//                 amount: row.amount,
//                 merchant: row.merchant
//             }
//             return transactionData;
//         });
//     } catch (err) {
//         console.log(err);
//         return [];
//     }
// };



export async function GET(request: Request): Promise<Response> {
    const query = "SELECT * FROM transaction";
    const connection = await getConnection();

    try {
        const result = await connection.execute(query, []);

        const data = (result[0] as RowDataPacket[]).map(cleanTransactionRecord);

        return new Response(JSON.stringify(data), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (err) {
        console.log(err);
        return new Response('Error fetching transactions', { status: 500 });
    }
}

export async function POST(request: Request): Promise<Response> {
    const query = 'INSERT INTO transaction (merchant, trans_date, amount, details) VALUES (?, ?, ?, ?);';
    const connection = await getConnection();

    const requestBody = await request.json();

    try {
        const result = await connection.execute(query, [
            requestBody.merchant, requestBody.trans_date, requestBody.amount, requestBody.description
        ]);

        const insertId = (result[0] as RowDataPacket).insertId;
        const newTransactionRecord = await connection.execute('SELECT * FROM transaction WHERE id = ?', [insertId]);
        const newTransaction = cleanTransactionRecord((newTransactionRecord[0] as RowDataPacket[])[0]);

        return new Response(JSON.stringify(newTransaction), { status: 201, headers: {'Content-Type': 'application/json' } });
    } catch (err) {
        console.log(err);
        return new Response('Error creating transaction', { status: 500 });
    }
}