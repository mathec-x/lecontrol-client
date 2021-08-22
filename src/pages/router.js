import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Register';
import Signin from './Signin';
import Edit from './Register/Edit';
import AppSuspense from '../components/Suspense';

const Home = React.lazy(() => import('./Home'));

const Router = withRouter(({ location }) => {
  const background = location.state?.background;

  return (
    <Suspense fallback={<AppSuspense />}>
      <Switch location={background || location}>
        <Route path="/" exact component={Home} />
      </Switch>
      <Route path="/signin" exact component={Signin} />
      <Route path="/register" exact component={Register} />
      <Route path="/register/:uuid" exact component={Edit} />
    </Suspense>
  );
});

export default Router;
