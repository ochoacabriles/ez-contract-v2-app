import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

const Dashboard = lazy(() => import(/* webpackChunkName: "Login" */ './dashboard'));
const EzToken = lazy(() => import(/* webpackChunkName: "Recover" */ './ez-token'));

const Home = () => (
  <Suspense fallback={<></>}>
    <Suspense fallback={<TopBarProgress />}>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ez-token" component={EzToken} />
        <Redirect to="/dashboard" />
      </Switch>
    </Suspense>
  </Suspense>
);

export default Home;
