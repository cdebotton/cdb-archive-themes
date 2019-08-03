import React from 'react';

import {
  useSetSession,
  useViewer,
  useProtectedRoute,
} from '../../components/Viewer';

export default function AdminPage() {
  const viewer = useViewer();
  const setSession = useSetSession();

  useProtectedRoute();

  function handleLogout() {
    setSession(null);
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <pre>
        <code>{JSON.stringify(viewer, null, 2)}</code>
      </pre>
    </>
  );
}
