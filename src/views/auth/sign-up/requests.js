import { gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation signUp($userToSignUp: UserToSignUp!) {
    signUp(userToSignUp: $userToSignUp) {
      token
    }
  }
`;

const TERMS = gql`
  query terms {
    terms
  }
`;

export { SIGN_UP, TERMS };
