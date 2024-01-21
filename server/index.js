const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/rootschema');
const multer = require("multer");
const path = require("path");

const port = process.env.SERVER_PORT || 48256;

const multStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + path.extname(file.originalname))
    }
});

const fileUpload = multer({
    storage: multStorage
});

async function startApolloServer(typeDefs, resolvers){
    
    // const server = new ApolloServer({typeDefs, resolvers, csrfPrevention: true})
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    app.use(cors());
    app.use(express.json());
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});

    app.post('/site-uploads', fileUpload.single('file'), (req, res) => {
        // console.log(req.file);
        console.log("Requested File has been uploaded!");
    });
    
    app.listen(port, () => { 
        console.log(`Server is listening on port ${port}${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);