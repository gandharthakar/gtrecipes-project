const createGQLUserModel = require('../mongodb/models/gql-test');
const { my_recipes, users } = require('./dummydata');
const { gql_mdb_conn } = require("../mongodb/db");

const resolvers = {
    Query: {
        recipes: () => my_recipes,
        recipe: (parent, args) => {
            let result = my_recipes.find((rec) => rec.id == args.id);
            return result;
        },
        RecipeWithUser: (parent, args) => {
            let recp = my_recipes.find((rec) => rec.id == args.id);
            return recp;
        }
    },
    Mutation: {
        createGqlUser: async (parent, {name, email, profile_picture}) => {
            gql_mdb_conn();
            let payload = {
                user_name: name,
                user_email: email,
                user_profile_picture: profile_picture
            };
            await createGQLUserModel.collection.insertOne(payload);
            return {
                name,
                email,
                profile_picture
            };
        }
    },
    RecipeWithUser: {
        user: (abc) => {
            let usr = users.filter((usr) => usr.id == abc.userid);
            return usr;
        }
    }
};

// module.exports = resolvers;