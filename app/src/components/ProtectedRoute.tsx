import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import * as ApolloTypes from './__generated__/ProtectedRoute';

type Props = RouteProps;

const QUERY = gql`
  query ProtectedRoute {
    viewer {
      id
    }
  }
`;

export default function ProtectedRoute({
  component: Component,
  render,
  children,
  ...props
}: Props) {
  const { data, loading } = useQuery<ApolloTypes.ProtectedRoute>(QUERY);

  return (
    <Route
      {...props}
      render={routeProps => {
        if (loading) {
          return <>Loading...</>;
        }

        if (!data || !data.viewer) {
          return <Redirect to="/login" />;
        }

        if (Component) {
          return <Component {...routeProps} />;
        }

        if (render) {
          return render(routeProps);
        }

        if (children && typeof children === 'function') {
          return children(routeProps);
        }

        return children;
      }}
    />
  );
}
