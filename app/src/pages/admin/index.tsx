import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components/macro';
import { rem } from 'polished';

import { Page } from '../../components/Page';
import { Heading, Container } from '../../components/Heading';
import { LogoutButton } from '../../components/LogoutButton';
import { useRouter } from '../../hooks/useRouter';
import { Loading } from '../../components/Loading';
import { NavLink } from '../../components/NavLink';

const AdminDashboard = lazy(() => import('./dashboard'));
const AdminGalleries = lazy(() => import('./galleries'));
const AdminMedia = lazy(() => import('./media'));
const AdminUsers = lazy(() => import('./users'));

export default function Admin() {
  const { match } = useRouter();

  return (
    <Page>
      <Container>
        <Header>
          <Heading scale={1}>Admin Portal</Heading>
          <Navigation>
            <NavLink exact to={match.url}>
              Dashboard
            </NavLink>
            <NavLink to={`${match.url}/galleries`}>Galleries</NavLink>
            <NavLink to={`${match.url}/media`}>Media</NavLink>
            <NavLink to={`${match.url}/users`}>Users</NavLink>
          </Navigation>
          <LogoutButton />
        </Header>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={match.url} component={AdminDashboard} />
            <Route path={`${match.url}/galleries`} component={AdminGalleries} />
            <Route path={`${match.url}/media`} component={AdminMedia} />
            <Route path={`${match.url}/users`} component={AdminUsers} />
          </Switch>
        </Suspense>
      </Container>
    </Page>
  );
}

const Header = styled.header`
  display: grid;
  grid-template-columns: max-content auto max-content;
  align-items: center;
  grid-gap: ${rem(16)};
`;

const Navigation = styled.nav`
  display: grid;
  grid-auto-flow: column dense;
  justify-content: start;
  grid-gap: ${rem(16)};
`;
