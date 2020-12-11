import { gql } from '@apollo/client';

const GET_TOKENS = gql`
  query tokensByUser($page: Int, $pageSize: Int) {
    tokensByUser(page: $page, pageSize: $pageSize) {
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
      }
    }
  }
`;

export { GET_TOKENS };
