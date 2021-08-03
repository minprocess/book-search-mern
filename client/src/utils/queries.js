import { gql } from '@apollo/client';

// See server/schemas/typeDef.js for User, Book and BookInput

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
