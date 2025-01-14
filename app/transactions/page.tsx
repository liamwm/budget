import mysql, { RowDataPacket } from 'mysql2/promise';

import TransactionsPlot from '../components/plot';


export default async function Page() {

    let data: DataPoint[] = [];
    
    const connection = await mysql.createConnection({
        host: 'budget_devcontainer-db-1',
        user: 'root',
        password: 'root',
        database: 'mydb',
    });

    try {
        const query = 'SELECT trans_date, SUM(amount) AS date_amount FROM transaction GROUP BY trans_date ORDER BY trans_date';
        const [result] = await connection.query(query);
        data = (result as RowDataPacket[]).map((row: RowDataPacket) => {
            const date = new Date(row.trans_date);
            const formattedDate = `${date.getDate()}/${date.getMonth()}`;
            return {
                timestamp: date.getTime(),
                date: formattedDate,
                amount: row.date_amount
            };
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }

    return (
        <div>
            <TransactionsPlot data={data} />
        </div>
    );
}