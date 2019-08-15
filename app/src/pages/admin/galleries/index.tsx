import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Heading, Container } from '../../../components/Heading';
import { useRouter } from '../../../hooks/useRouter';

const AdminGalleriesListPage = lazy(() => import('./list'));
const AdminNewGalleryPage = lazy(() => import('./new'));
const AdminEditGalleryPage = lazy(() => import('./edit'));

export default function AdminGalleries() {
  const { match } = useRouter();

  return (
    <Container>
      <Heading>Galleries</Heading>
      <Switch>
        <Route path={`${match.url}/new`} component={AdminNewGalleryPage} />
        <Route
          path={`${match.url}/:galleryId`}
          component={AdminEditGalleryPage}
        />
        <Route exact path={match.url} component={AdminGalleriesListPage} />
      </Switch>
    </Container>
  );
}
