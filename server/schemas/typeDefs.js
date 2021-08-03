const { gql } = require('apollo-server-express');

/*
 Book type:
 bookId (Not the '_id', but the book's 'id' value returned from Google's Book API.)
 authors (An array of strings, as there may be more than one author.)
 description
 title
 image
 link
*/

/*
input MessageInput {
  content: String
  author: String
}

type Message {
  id: ID!
  content: String
  author: String
}

type Query {
  getMessage(id: ID!): Message
}

type Mutation {
  createMessage(input: MessageInput): Message
  updateMessage(id: ID!, input: MessageInput): Message
}
*/

/*
User type:
_id
username
email
bookCount
savedBooks (This will be an array of the `Book` type.)
*/


const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    bookCount: Number
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
