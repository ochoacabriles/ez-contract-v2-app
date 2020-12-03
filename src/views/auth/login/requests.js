import { gql } from '@apollo/client';

const LOG_IN = gql`
  query login($userToLogin: UserToLogin!) {
    login(userToLogin: $userToLogin) {
      token
    }
  }
`;

export { LOG_IN };
