const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/rootschema');

const port = process.env.SERVER_PORT || 48256;

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    app.use(cors())
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);