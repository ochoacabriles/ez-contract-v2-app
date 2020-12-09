import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApolloProvider } from '@apollo/client';
import { BlockdemyUIProvider } from './providers/theme';
import { UserProvider } from './providers/user';
import client from './graphql';
import App from './App';
import theme from './theme';
import reportWebVitals from './reportWebVitals';

// Import fonts
import 'fontsource-montserrat';
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>ez-contract.</title>
      <link rel="canonical" href="https://app.ez-contract.io" />
      <meta name="description" content="Create and deploy ethereum smart contracts with a few clicks!" />
      <meta name="theme-color" content={theme.colors.primary} />
    </Helmet>
    <ApolloProvider client={client}>
      <BlockdemyUIProvider>
        <UserProvider>
          <Router basename="/">
            <App />
          </Router>
        </UserProvider>
      </BlockdemyUIProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
