import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './providers/web3';
import { BlockdemyUIProvider } from './providers/theme';
import { UserProvider } from './providers/user';
import client from './graphql';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import fonts
import 'fontsource-montserrat';
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BlockdemyUIProvider>
        <UserProvider>
          <Web3ReactProvider
            getLibrary={getLibrary}
          >
            <Router basename="/">
              <App />
            </Router>
          </Web3ReactProvider>
        </UserProvider>
      </BlockdemyUIProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
