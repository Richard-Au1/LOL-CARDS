const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
}

type Champion {
    _id: ID
    name: String
    description: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    champions(username: String): [Champion]
    champion(championId: ID!): Champion
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeChampion(championId: ID!): Champion
}
`;

module.exports = typeDefs;