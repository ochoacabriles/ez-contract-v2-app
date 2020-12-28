import { gql } from '@apollo/client';

const CONFIRM_ICO = gql`
  mutation icoConfirm($icoId: ID!) {
    icoConfirm(icoId: $icoId) {
      id
    }
  }
`;

const FUND_ICO = gql`
  mutation icoFund($icoId: ID!, $fundingTransactionHash: String!) {
    icoFund(icoId: $icoId, fundingTransactionHash: $fundingTransactionHash) {
      id
    }
  }
`;

const GET_CONTRACT_SOURCE = gql`
  query contractSource($contractSourceId: ID!) {
    contractSource(contractSourceId: $contractSourceId) {
      id
      abi
    }
  }
`;

export { CONFIRM_ICO, GET_CONTRACT_SOURCE, FUND_ICO };
