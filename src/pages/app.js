import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppSuspense from '../components/Suspense';
import AppBar from '../components/AppBar';
import PreLoader from '../components/PreLoader';

import Menu from './Menu';
import Signin from './Signin';
import Register from './Register';
import Edit from './Register/Edit';

const Home = React.lazy(() => import('./Home'));

const App = withRouter(({ location }) => {
  const background = location.state?.background;

  return (
    <>
      <AppBar />
      <Container fixed disableGutters>
        <Suspense fallback={<AppSuspense />}>
          <Switch location={background || location}>
            <Route path="/" exact component={Home} />
          </Switch>
          <Route path="/signin" exact component={Signin} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/:uuid" exact component={Edit} />
        </Suspense>
      </Container>
      <Menu />
      <PreLoader />
    </>
  );
});

export default App;
