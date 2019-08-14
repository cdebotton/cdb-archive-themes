import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container, Heading } from '../../../components/Heading';
import { useRouter } from '../../../hooks/useRouter';

const AdminUsersIndex = lazy(() => import('./list'));
const AdminUsersUser = lazy(() => import('./edit'));
const AdminCreateUser = lazy(() => import('./create'));

export default function AdminUsers() {
  const { match } = useRouter();

  return (
    <Container>
      <Heading>Users</Heading>
      <Switch>
        <Route path={`${match.url}/new`} component={AdminCreateUser} />
        <Route path={`${match.url}/:userId`} component={AdminUsersUser} />
        <Route path={match.url} component={AdminUsersIndex} />
        <Route />
      </Switch>
    </Container>
  );
}
