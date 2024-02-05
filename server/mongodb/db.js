const { default: mongoose } = require("mongoose");

const { GQLTESTDB_LOCAL, GTRECIPES_LOCAL } = process.env;

const gql_mdb_conn = async () => {
    mongoose.connect(GQLTESTDB_LOCAL)
    .then((data) => console.log('GraphQL Testing Server MongoDB Is Running.'))
    .catch((err)=>console.log(err));
};

const gtrecipes_mdb = async () => {
    mongoose.connect(GTRECIPES_LOCAL)
    .then((data) => console.log('Database Connected Successfully.'))
    .catch((err)=>console.log(err));
};

module.exports = {
    gql_mdb_conn,
    gtrecipes_mdb
}