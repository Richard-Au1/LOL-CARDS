import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id: ID
    username
    email
    password
    }
  }
`;

export const QUERY_CHAMPIONS = gql`
  query champion($name: String!) {
    champion(name: $name) {
      name
      description
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
