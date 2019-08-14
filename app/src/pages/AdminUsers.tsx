import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container, Heading } from '../components/Heading';
import { useRouter } from '../hooks/useRouter';

const AdminUsersIndex = lazy(() => import('./AdminUsersIndex'));
const AdminUsersUser = lazy(() => import('./AdminUsersUser'));

export default function AdminUsers() {
  const { match } = useRouter();

  return (
    <Container>
      <Heading scale={3}>Users</Heading>
      <Switch>
        <Route exact path={match.url} component={AdminUsersIndex} />
        <Route path={`${match.url}/:userId`} component={AdminUsersUser} />
        <Route />
      </Switch>
    </Container>
  );
}
