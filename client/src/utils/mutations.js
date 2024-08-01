import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($userId: ID!, $bookInput: BookInput!) {
    addBook(userId: $userId, bookInput: $bookInput) {
      id
      username
      savedBooks {
        bookId
        title
        authors
      }
    }
  }
`;
