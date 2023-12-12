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

export const QUERY_SINGLE_CHAMPIONS = gql `
query getSingleChampion($championId: ID!){
  champion(championId: $champtionId) {
    _id
  }
}
`
