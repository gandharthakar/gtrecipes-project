const { my_recipes, users } = require('./dummydata');

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
    RecipeWithUser: {
        user: (abc) => {
            let usr = users.filter((usr) => usr.id == abc.userid);
            return usr;
        }
    }
};

module.exports = resolvers;