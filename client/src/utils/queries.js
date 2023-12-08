import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
    user {
      _id: ID
    username: String
    email: String
    password: String
    }
  }
`;

export const QUERY_CHAMPIONS = gql`
  query champion {
    champion {
      name: STRING
      description: STRING
    }
  }
`;
