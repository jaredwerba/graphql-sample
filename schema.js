const { gql } = require('apollo-server-express');
const oracledb = require('oracledb');

// GraphQL schema
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    type Mutation {
        addBook(title: String, author: String): Book
    }
`;

// Resolvers
const resolvers = {
    Query: {
        books: async () => {
            // Implementation
        }
    }
};

module.exports = { typeDefs, resolvers };
