const { gql } = require('apollo-server-micro');

export  const  typeDefs  = gql`
    type  User {
        id: ID
        login: String
        avatar_url: String
    }

    type  Query {
        getUsers: [User]
        getUser(name: String!): User!
        getposts:[post]
        getpost(id: [Int]!): post!
    }

    type post {
        id: ID
        title: String
        body: String
      }
`;

