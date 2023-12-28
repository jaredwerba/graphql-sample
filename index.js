const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const oracledb = require('oracledb');
const { typeDefs, resolvers } = require('./schema');

async function initializeOracle() {
    try {
        await oracledb.createPool({
            user: 'your_username',
            password: 'your_password',
            connectString: 'localhost:1521/your_database' // Modify as needed
        });
        console.log('Connected to Oracle database');
    } catch (err) {
        console.error('Error connecting to Oracle database', err);
    }
}

async function closeOracle() {
    try {
        await oracledb.getPool().close();
        console.log('Oracle database connection pool closed');
    } catch (err) {
        console.error('Error closing Oracle database connection pool', err);
    }
}

async function startApolloServer(typeDefs, resolvers) {
    await initializeOracle();

    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );

    // Clean up resources on shutdown
    process.on('SIGINT', async () => {
        await server.stop();
        await closeOracle();
        process.exit(0);
    });
}

startApolloServer(typeDefs, resolvers);
