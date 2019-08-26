import React from 'react';

import withApollo from '../../lib/withApollo';
import { Container, Heading } from '../../components/Heading';

function Admin() {
  return (
    <Container>
      <Heading>Admin</Heading>
    </Container>
  );
}

export default withApollo(Admin);
