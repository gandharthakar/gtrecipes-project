const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/rootschema');
const path = require("path");
const { gtrecipes_mdb } = require("./mongodb/db");
const fs = require("fs");

const port = process.env.SERVER_PORT || 48256;

async function startApolloServer(typeDefs, resolvers) {

    await gtrecipes_mdb();

    // const server = new ApolloServer({typeDefs, resolvers, csrfPrevention: true})
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: false,
        playground: false,
        persistedQueries: false,
    })
    const app = express();
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:4173", "https://gtrecipes.netlify.app", "http://localhost:48256", "https://studio.apollographql.com", "https://gtrecipes-project.onrender.com"]
    }));
    app.use(express.json({ limit: '10mb' }));
    // app.use(express.json({ limit: '10mb', extended: false }));
    // app.use(express.urlencoded({ limit: '10mb', extended: false }));
    app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
        bodyParserConfig: {
            limit: "10mb"
        }
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);