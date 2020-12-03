import { gql } from '@apollo/client';

const CONFIRM_TOKEN = gql`
  mutation tokenConfirm($tokenId: ID!) {
    tokenConfirm(tokenId: $tokenId) {
      id
    }
  }
`;

export { CONFIRM_TOKEN };
