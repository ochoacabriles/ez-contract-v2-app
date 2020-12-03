import { gql } from '@apollo/client';

const GET_USER = gql`
  query userByToken {
    userByToken {
      id
      firstName
      lastName
      email
    }
  }
`;

export { GET_USER };
