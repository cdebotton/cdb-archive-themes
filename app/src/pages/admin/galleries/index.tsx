import React, { lazy } from 'react';

import { Heading, Container } from '../../../components/Heading';
import { Switch, Route } from 'react-router-dom';
import { useRouter } from '../../../hooks/useRouter';

const AdminGalleriesListPage = lazy(() => import('./list'));
const AdminUserNewPage = lazy(() => import('./new'));

export default function AdminGalleries() {
  const { match } = useRouter();

  return (
    <Container>
      <Heading>Galleries</Heading>
      <Switch>
        <Route path={`${match.url}/new`} component={AdminUserNewPage} />
        <Route exact path={match.url} component={AdminGalleriesListPage} />
      </Switch>
    </Container>
  );
}
