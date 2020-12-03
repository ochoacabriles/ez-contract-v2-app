import { useState, createContext } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { GET_USER } from './requests';

export const userContext = createContext({});

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(cookie.load('token'));

  const { data, loading, refetch } = useQuery(GET_USER, { skip: !token });

  return (
    <userContext.Provider
      value={{
        user: data?.userByToken ?? {},
        loadingUser: loading,
        token,
        setToken,
        reloadUser: refetch,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
