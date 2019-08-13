import React from 'react';

import { Text } from '../../components/Text';

import { AdminLayout } from '../../components/AdminLayout';
import { withApollo } from '../../libs/with-apollo';

function AdminGalleriesPage() {
  return (
    <AdminLayout>
      <Text>Galleries</Text>
    </AdminLayout>
  );
}

export default withApollo(AdminGalleriesPage);
