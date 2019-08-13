import React from 'react';

import { AdminLayout } from '../../components/AdminLayout';
import { withApollo } from '../../libs/with-apollo';

function AdminIndexPage() {
  return <AdminLayout>Hi!</AdminLayout>;
}

export default withApollo(AdminIndexPage);
