import React, { ReactElement, FunctionComponent, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from '../sections';
import routes from '../../config/routes';

import '../../styles/app.scss';
import { isAuth, signIn } from '../../shared/api/authentication';
import { BrokerInterface } from './Broker.model';
import { services } from '../../shared';

export const App: FunctionComponent = (): ReactElement => {
  const [broker, setBroker] = useState<BrokerInterface>();

  // useEffect(() => {
  //   if (isAuth()) return true); //services.getBroker().then((user) => setBroker(user.data)
  // }, []);
  try {
    return isAuth() ? (
      <>
        <Header firstName={broker?.name?.split(' ')[0] ?? ''} lastName={broker?.name?.split(' ')[1] ?? ''} />
        <main>
          <Switch>
            {routes.map((route) => (
              <Route key={route.id} path={route.paths || route.path} component={route.component} exact />
            ))}
          </Switch>
        </main>
      </>
    ) : (
      <Route
        to="/"
        render={() => {
          console.log('bad route', '/');
          // signIn();
          return null;
        }}
      />
    );
  } catch (err) {
    console.log(err);
  }
};
