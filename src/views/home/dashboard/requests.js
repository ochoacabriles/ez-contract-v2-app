import { gql } from '@apollo/client';

const GET_TOKENS = gql`
  query tokensByUser($isIco: Boolean, $page: Int, $pageSize: Int) {
    tokensByUser(isIco: $isIco, page: $page, pageSize: $pageSize) {
      info {
        count
      }
      results {
        id
        address
        proprietaryAddress
        blockNumber
        name
        symbol
        supply
        network
        isIco
      }
    }
  }
`;

const GET_ICOS = gql`
  query icosByUser($page: Int, $pageSize: Int) {
    icosByUser(page: $page, pageSize: $pageSize) {
      info {
        count
      }
      results {
        id
        address
        blockNumber
        rate
        fundingTransactionHash
        token {
          id
          name
          symbol
          supply
          address
          network
        }
      }
    }
  }
`;

export { GET_TOKENS, GET_ICOS };
