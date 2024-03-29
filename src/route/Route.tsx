import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Form } from '../presentation/form/Form';
import { Photos } from '../presentation/gallery/Photos';
import { Login } from '../presentation/login/login';
import { Posts } from '../presentation/posts/Posts';

export type MyRouteComponentProps = RouteComponentProps<any> & {
  routes: Rout[];
};

interface Rout {
  path?: string[] | string;
  component: React.ComponentType<MyRouteComponentProps> | React.ComponentType<any>;
  routes: Rout[];
  exact?: boolean;
  strict?: boolean;
}

export const Routes: Rout[] = [
  {
    path: ['/photos'],
    component: Photos,
    routes: [],
    strict: true
  },
  {
    path: ['/posts'],
    component: Posts,
    routes: [],
    strict: true
  },
  {
    path: ['/form'],
    component: Form,
    routes: [],
    strict: true
  },
  {
    path: ['/login'],
    component: Login,
    routes: [],
    strict: true
  }
];

export const RouteWithSubRoutes: React.FC<Rout> = route => {
  return <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />;
};

export const RoutesConfig: React.FC = () => {
  return (
    <Switch>
      {Routes.map((rout, index) => {
        return <RouteWithSubRoutes key={index} {...rout} />;
      })}
    </Switch>
  );
};
