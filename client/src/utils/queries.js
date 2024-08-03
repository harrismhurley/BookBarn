import { gql } from '@apollo/client';

// Query to get all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;

// Query to get a specific user by ID
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      bookCount
    }
  }
`;

// Query to get the current logged-in user's information
export const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      bookCount
    }
  }
`;
