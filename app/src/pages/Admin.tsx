import React, { lazy, Suspense } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import { Page } from '../components/Page';
import { Heading } from '../components/Heading';
import { LogoutButton } from '../components/LogoutButton';
import { useRouter } from '../hooks/useRouter';

const AdminDashboard = lazy(() => import('./AdminDashboard'));
const AdminGalleries = lazy(() => import('./AdminGalleries'));
const AdminMedia = lazy(() => import('./AdminMedia'));
const AdminUsers = lazy(() => import('./AdminUsers'));

export default function Admin() {
  const { match } = useRouter();

  return (
    <Page>
      <header>
        <Heading scale={4}>Admin</Heading>
        <nav>
          <NavLink exact to={match.url}>
            Dashboard
          </NavLink>
          <NavLink exact to={`${match.url}/galleries`}>
            Galleries
          </NavLink>
          <NavLink exact to={`${match.url}/media`}>
            Media
          </NavLink>
          <NavLink exact to={`${match.url}/users`}>
            Users
          </NavLink>
        </nav>
        <LogoutButton />
      </header>
      <Suspense fallback={<>Loading...</>}>
        <Switch>
          <Route exact path={match.url} component={AdminDashboard} />
          <Route path={`${match.url}/galleries`} component={AdminGalleries} />
          <Route path={`${match.url}/media`} component={AdminMedia} />
          <Route path={`${match.url}/users`} component={AdminUsers} />
        </Switch>
      </Suspense>
    </Page>
  );
}
