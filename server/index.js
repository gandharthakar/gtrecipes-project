const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/rootschema');
const multer = require("multer");
const path = require("path");
const { gtrecipes_mdb } = require("./mongodb/db");
const fs = require("fs");

const port = process.env.SERVER_PORT || 48256;

function uploadFileWithDest(dest) {
    const multStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            // console.log(dest);
            cb(null, 'public/uploads/'+ dest);
        },
        filename: (req, file, cb) => {
            // cb(null, file.originalname + path.extname(file.originalname));
            // console.log(file.originalname);
            cb(null, file.originalname);
        }
    });

    const fileUpload = multer({
        storage: multStorage,
        // limits: {
        //     fieldSize: "10MB",
        //     fileSize: "10MB"
        // },
    }).single('file');

    return fileUpload;
}

async function startApolloServer(typeDefs, resolvers){
    
    gtrecipes_mdb();

    // const server = new ApolloServer({typeDefs, resolvers, csrfPrevention: true})
    const server = new ApolloServer({
        typeDefs, 
        resolvers,
        introspection: false,
        playground: false,
    })
    const app = express();
    app.use(cors());
    app.use(express.json());
    // app.use(express.json({ limit: '10mb', extended: false }));
    // app.use(express.urlencoded({ limit: '10mb', extended: false }));
    app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});

    app.post('/site-uploads/:dest', (req, res) => {
        // console.log(req.file);
        // console.log(req.params.dest);
        let currUpload = uploadFileWithDest(req.params.dest);
        currUpload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            res.json({error_code:0,err_desc:null});
        });
        console.log("Requested File has been uploaded!");
    });

    app.post('/delete-uploads/:dest', (req, res) => {
        // console.log(req.params.dest);
        // console.log(req.body.fileName);
        const filename = req.body.fileName;
        const dest = req.params.dest;
        const filePath = path.join(__dirname, './public/uploads/'+dest, filename);

        // Check if file exists before deletion
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send('File not found');
            }

            // Delete the file
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(500).send('Error deleting file');
                }
                res.send('File deleted successfully');
            });
        });
    });
    
    app.listen(port, () => { 
        console.log(`Server is listening on port ${port}${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);