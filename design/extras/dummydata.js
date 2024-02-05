const my_recipes = [
    {
        id: 1,
        recipe_title: "this is dummy recipe for user 1",
        recipe_content: "abc",
        userid: "2",
    },
    {
        id: 2,
        recipe_title: "this is dummy recipe for user 2",
        recipe_content: "abc",
        userid: "3",
    },
    {
        id: 3,
        recipe_title: "this is dummy recipe for user 3",
        recipe_content: "abc",
        userid: "1",
    }
];

const users = [
    {
        id: 1,
        name: "John Paul",
        email: "john_paul98@gmail.com",
        isAdmin: false,
    },
    {
        id: 2,
        name: "Marina Joseph",
        email: "joseph_mar54@gmail.com",
        isAdmin: false,
    },
    {
        id: 3,
        name: "Peter Jackson",
        email: "petjacky96@gmail.com",
        isAdmin: false,
    }
]

module.exports = {
    my_recipes,
    users
}