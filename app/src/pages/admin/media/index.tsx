import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Heading, Container } from '../../../components/Heading';
import { useRouter } from '../../../hooks/useRouter';

const AdminListMediaPage = lazy(() => import('./list'));

export default function AdminMedia() {
  const { match } = useRouter();

  return (
    <Container>
      <Heading>Media</Heading>
      <Switch>
        <Route path={`${match.url}/:mediaId`} />
        <Route exact path={match.url} component={AdminListMediaPage} />
      </Switch>
    </Container>
  );
}
