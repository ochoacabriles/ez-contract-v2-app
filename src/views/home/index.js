import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import MainLayout from '../../layouts/main';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ './dashboard'));
const EzToken = lazy(() => import(/* webpackChunkName: "EzToken" */ './ez-token'));
const EzIcoBasic = lazy(() => import(/* webpackChunkName: "EzIcoBasic" */ './ez-ico-basic'));

const Home = () => (
  <MainLayout>
    <Suspense fallback={<TopBarProgress />}>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ez-token" component={EzToken} />
        <Route path="/ez-ico-basic" component={EzIcoBasic} />
        <Redirect to="/dashboard" />
      </Switch>
    </Suspense>
  </MainLayout>
);

export default Home;
