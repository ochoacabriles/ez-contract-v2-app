import { gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation signUp($userToSignUp: UserToSignUp!) {
    signUp(userToSignUp: $userToSignUp) {
      token
    }
  }
`;

export { SIGN_UP };
