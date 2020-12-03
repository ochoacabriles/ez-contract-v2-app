import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  defaultOptions: {
    query: {
      errorPolicy: 'all'
    }
  },
  cache: new InMemoryCache(),
  credentials: 'include'
});

export default client;
