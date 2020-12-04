import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import MainLayout from '../../layouts/main';

const Dashboard = lazy(() => import(/* webpackChunkName: "Login" */ './dashboard'));
const EzToken = lazy(() => import(/* webpackChunkName: "Recover" */ './ez-token'));

const Home = () => (
  <MainLayout>
    <Suspense fallback={<TopBarProgress />}>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ez-token" component={EzToken} />
        <Redirect to="/dashboard" />
      </Switch>
    </Suspense>
  </MainLayout>
);

export default Home;
