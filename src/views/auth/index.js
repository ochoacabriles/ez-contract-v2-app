import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './login'));
const SignUp = lazy(() => import(/* webpackChunkName: "Recover" */ './sign-up'));

const Auth = () => (
  <Suspense fallback={<></>}>
    <Suspense fallback={<TopBarProgress />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Redirect to="/login" />
      </Switch>
    </Suspense>
  </Suspense>
);

export default Auth;
