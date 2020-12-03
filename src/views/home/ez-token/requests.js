import { gql } from '@apollo/client';

const GET_CONTRACT_SOURCE = gql`
  query contractSource($contractSourceId: ID!) {
    contractSource(contractSourceId: $contractSourceId) {
      id
      name
      abi
      bytecode
    }
  }
`;

const ADD_TOKEN = gql`
  mutation tokenAdd($tokenToAdd: TokenToAdd!) {
    tokenAdd(tokenToAdd: $tokenToAdd) {
      id
    }
  }
`;

export { GET_CONTRACT_SOURCE, ADD_TOKEN };
