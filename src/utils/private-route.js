import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ token, component: Component, ...rest }) => {

  return (
    <Route {...rest} render={props => (token
      ? <Component {...props} />
      : <Redirect to="/login" />
      )}
    />
  );
};

export default PrivateRoute;
