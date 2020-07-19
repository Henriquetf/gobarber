import React from 'react';
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate && !isAuthenticated) {
          return (
            <Redirect
              to={{
                state: { from: location },
                pathname: '/',
              }}
            />
          );
        }

        if (!isPrivate && isAuthenticated) {
          return (
            <Redirect
              to={{
                state: { from: location },
                pathname: '/dashboard',
              }}
            />
          );
        }

        return <Component />;
      }}
    />
  );
};

export default Route;
