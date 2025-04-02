import mysql from 'mysql2/promise';


let connection : mysql.Connection;

export const getConnection = async () : Promise<mysql.Connection> => {
    if (!connection) {
        connection = await mysql.createConnection({
            host: 'budget_devcontainer-db-1',
            user: 'root',
            password: 'root',
            database: 'mydb',
        });
    }

    return connection;
}