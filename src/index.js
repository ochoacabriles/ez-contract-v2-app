import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
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
