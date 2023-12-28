const oracledb = require('oracledb');

async function createTableAndInsertData() {
    let connection;

    try {
        // Update with your database credentials
        connection = await oracledb.getConnection({
            user: 'your_username',
            password: 'your_password',
            connectString: 'your_connect_string' // e.g., 'localhost:1521/your_service_name'
        });

        // Create a new table
        const createTableSql = `
            CREATE TABLE books (
                id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
                title VARCHAR2(255),
                author VARCHAR2(255),
                PRIMARY KEY(id)
            )
        `;
        await connection.execute(createTableSql);

        // Insert some data
        const insertSql = `
            INSERT INTO books (title, author) VALUES (:title, :author)
        `;
        const books = [
            { title: "1984", author: "George Orwell" },
            { title: "Brave New World", author: "Aldous Huxley" }
            // Add more books as needed
        ];
        for (let book of books) {
            await connection.execute(insertSql, [book.title, book.author]);
        }

        // Commit the changes
        await connection.commit();

        console.log('Table created and data inserted successfully.');
    } catch (err) {
        console.error('Error occurred', err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing the connection', err);
            }
        }
    }
}

createTableAndInsertData();
