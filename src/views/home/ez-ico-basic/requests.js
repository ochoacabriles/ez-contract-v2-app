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

const GET_TOKEN = gql`
  query token($tokenId: ID!) {
    token(tokenId: $tokenId) {
      id
      name
      symbol
      supply
    }
  }
`;

const ADD_ICO = gql`
  mutation icoAdd($icoToAdd: IcoToAdd!) {
    icoAdd(icoToAdd: $icoToAdd) {
      id
    }
  }
`;

export { GET_CONTRACT_SOURCE, ADD_ICO, GET_TOKEN };
