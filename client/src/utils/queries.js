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
    }
  }
`;

// Query to get the current logged-in user's information
export const ME = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`;
